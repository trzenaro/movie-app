const bcrypt = require('bcrypt');
const _ = require('lodash');
const { UserModel } = require('../../models');
const { CustomError } = require('../../../utils/error-types');

class UserService {
    constructor({ cacheService }) {
        this._cacheService = cacheService;
    }

    async getUsers(filters) {
        return UserModel.find({ ...filters });
    }

    async getUserById(userId) {
        let loadedUser = await this._cacheService.get(`USERS:${userId}`);
        if (loadedUser) {
            loadedUser = new UserModel(loadedUser);
        } else {
            loadedUser = await UserModel.findOne({ _id: userId });
            if (loadedUser) this._cacheService.set(`USERS:${userId}`, loadedUser.toObject(), 600);
        }
        return loadedUser;
    }

    async getUserByEmail(email) {
        return UserModel.findOne({ email });
    }

    async addUser(userPayload) {
        const userStored = await this.getUserByEmail(userPayload.email)
        if (userStored) throw new CustomError('USER_ALREADY_EXISTS', `Usuário ${userPayload.email} já existe`)

        userPayload.password = bcrypt.hashSync(userPayload.password, 10)
        const userAdded = await UserModel.create(userPayload);
        return userAdded;
    }

    async updateUser(userPayload) {
        const { _id, password, email, ...userToBeUpdated } = userPayload;
        this._cacheService.delete(`USERS:${_id}`);
        const userUpdated = await UserModel.findOneAndUpdate({ _id }, { $set: userToBeUpdated }, { new: true });
        return userUpdated;
    }
}

module.exports = UserService;