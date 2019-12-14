const bcryptjs = require('bcryptjs');
const { UserModel } = require('../../models');
const { CustomError } = require('../../../utils/error-types');
const buildPaginatedAndSortedQueryRunner = require('../../../infrastructure/mongodb-query-runner-builder');

class UserService {
  constructor({ cacheService }) {
    this._cacheService = cacheService;
    this._runPaginatedAndSortedQuery = buildPaginatedAndSortedQueryRunner(UserModel);
  }

  async getUsers({ filters, pagination, assortment }) {
    return this._runPaginatedAndSortedQuery({ filters, pagination, assortment });
  }

  async getUserById(userId) {
    let loadedUser = await this._cacheService.get(`USERS:${userId}`);
    if (loadedUser) {
      loadedUser = new UserModel(loadedUser);
      loadedUser.isNew = false;
    } else {
      loadedUser = await UserModel.findOne({ _id: userId });
      if (loadedUser) this._cacheService.set(`USERS:${userId}`, loadedUser.toObject(), 600);
    }

    if (!loadedUser) throw new CustomError('USER_NOT_FOUND', 'Usuário não encontrado');
    return loadedUser;
  }

  async getUserByEmail(email) {
    return UserModel.findOne({ email });
  }

  async addUser(userPayload) {
    const userStored = await this.getUserByEmail(userPayload.email);
    if (userStored) throw new CustomError('USER_ALREADY_EXISTS', `Usuário ${userPayload.email} já existe`);

    userPayload.password = this._encryptPassword(userPayload.password);
    const userAdded = await UserModel.create(userPayload);
    return userAdded;
  }

  async updateUser(userPayload) {
    const { _id, password, email, ...userModifications } = userPayload;

    const userToBeUpdated = await this.getUserById(_id);
    if (email) {
      const existingUserByEmail = await this.getUserByEmail(email);
      if (existingUserByEmail && existingUserByEmail._id != _id) throw new CustomError('USER_ALREADY_EXISTS', `Usuário ${userPayload.email} já existe`);
      userToBeUpdated.email = email;
    }
    if (password) userToBeUpdated.password = this._encryptPassword(password);

    this._cacheService.delete(`USERS:${_id}`);
    Object.assign(userToBeUpdated, userModifications);

    const updatedUser = await userToBeUpdated.save();
    return updatedUser;
  }

  async getUserFromCredentials(credentials) {
    const { email, password } = credentials;
    const user = await this.getUserByEmail(email);
    if (!user) throw new CustomError('INVALID_CREDENTIALS', 'Usuário e/ou senha inválidos');

    if (this._comparePassword(password, user.password)) {
      return user;
    }
    throw new CustomError('INVALID_CREDENTIALS', 'Usuário e/ou senha inválidos');
  }

  _encryptPassword(password) {
    return bcryptjs.hashSync(password, 10);
  }

  _comparePassword(password, checkPassword) {
    return bcryptjs.compareSync(password, checkPassword);
  }
}

module.exports = UserService;
