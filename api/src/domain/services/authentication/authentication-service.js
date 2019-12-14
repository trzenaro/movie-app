const jwt = require('jsonwebtoken');
const config = require('../../../config');
const { CustomError } = require('../../../utils/error-types');
const { TokenModel } = require('../../models');

const jwtConfig = config.jwt;

class AuthenticationService {
  constructor({ cacheService, userService }) {
    this._cacheService = cacheService;
    this._userService = userService;
  }

  async login(credentials) {
    const user = await this._userService.getUserFromCredentials(credentials);
    return this.generateToken(user);
  }

  async generateToken(user) {
    const token = jwt.sign({ _id: user._id, email: user.email }, jwtConfig.secretKey, { expiresIn: `${jwtConfig.secretExpires}s` });
    const refreshToken = jwt.sign({ _id: user._id }, jwtConfig.refreshSecretKey, { expiresIn: jwtConfig.refreshSecretExpires ? `${jwtConfig.refreshSecretExpires}s` : null });

    const tokenDocument = new TokenModel({ user: user._id, type: 'TOKEN', value: token });
    const refreshTokenDocument = new TokenModel({ user: user._id, type: 'REFRESH_TOKEN', value: refreshToken });

    await Promise.all([
      TokenModel.insertMany([tokenDocument, refreshTokenDocument]),
      this._cacheService.set(`TOKENS:${token}`, tokenDocument.toObject(), jwtConfig.secretExpires),
    ]);
    return { token, refreshToken };
  }

  async getUserFromToken(token, refreshToken) {
    const user = {};
    try {
      let tokenDocument = await this._cacheService.get(`TOKENS:${token}`);
      if (tokenDocument) {
        tokenDocument = new TokenModel(tokenDocument);
      } else {
        tokenDocument = await TokenModel.findOne({ type: 'TOKEN', value: token });
        if (!tokenDocument) throw new CustomError('INVALID_TOKEN', 'Invalid token');
      }

      jwt.verify(tokenDocument.value, jwtConfig.secretKey);
      user.user = await this._userService.getUserById(tokenDocument.user);
    } catch (error) {
      const refreshJwtUser = jwt.verify(refreshToken, jwtConfig.refreshSecretKey);
      const refreshTokenDocument = await TokenModel.findOne({ type: 'REFRESH_TOKEN', value: refreshToken });

      if (!refreshTokenDocument || refreshTokenDocument.user.toString() !== refreshJwtUser._id) throw new CustomError('INVALID_REFRESH_TOKEN', 'Invalid refresh token');

      const userToken = await this._userService.getUserById(refreshTokenDocument.user);
      const newTokens = await this.generateToken(userToken);

      user.user = userToken;
      user.newToken = newTokens.token;
      user.newRefreshToken = newTokens.refreshToken;
    }

    return user;
  }

  async revokeToken(token) {
    await Promise.all([
      this._cacheService.delete(`TOKENS:${token}`),
      TokenModel.deleteOne({ value: token }),
    ]);
  }
}

module.exports = AuthenticationService;
