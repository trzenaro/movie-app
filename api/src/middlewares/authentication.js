const HttpStatus = require('http-status-codes');
const { resolveScopedContainer } = require('../config/ioc-container');

module.exports = async (req, res, next) => {
  const authenticationService = resolveScopedContainer('authenticationService');
  const authorization = req.headers.authorization || req.headers.token || '';
  const refreshToken = req.headers['refresh-token'] || '';
  if (authorization) {
    const tokenPieces = authorization.split(' ');
    const tokenType = tokenPieces[0].toLowerCase();
    const token = (tokenType === 'bearer' ? tokenPieces[1] : tokenPieces[0]);
    try {
      const { newToken, newRefreshToken, ...user } = (await authenticationService.getUserFromToken(token, refreshToken));
      if (newToken && newRefreshToken) {
        res.set('token', newToken);
        res.set('refresh-token', newRefreshToken);
      }
      req.user = user.user;
      next();
    } catch (err) {
      res.status(HttpStatus.UNAUTHORIZED).end();
    }
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Token not provided' });
  }
};
