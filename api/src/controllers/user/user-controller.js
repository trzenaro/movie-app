const HttpStatus = require('http-status-codes');
const { resolveScopedContainerFromRequest } = require('../../config/ioc-container');
const { CustomError } = require('../../utils/error-types');
const { getDefaultSearchFromQuery } = require('../helpers/mappers');

const addUser = async (req, res) => {
  const userService = resolveScopedContainerFromRequest(req, 'userService');
  const userAdded = await userService.addUser(req.body);
  res.status(HttpStatus.CREATED).json(userAdded);
};

const getUserById = async (req, res) => {
  const userService = resolveScopedContainerFromRequest(req, 'userService');
  const user = await userService.getUserById(req.params.userId);
  if (!user) throw new CustomError('USER_NOT_FOUND', 'Usuário não encontrado')
  res.json(user);
};

const getUsers = async (req, res) => {
  const userService = resolveScopedContainerFromRequest(req, 'userService');
  const query = getDefaultSearchFromQuery(req.query);
  const users = await userService.getUsers(query);
  res.json(users);
};

const updateUserById = async (req, res) => {
  const userService = resolveScopedContainerFromRequest(req, 'userService');
  const userUpdated = await userService.updateUser({ _id: req.params.userId, ...req.body });
  if (!userUpdated) throw new CustomError('USER_NOT_FOUND', 'Usuário não encontrado')
  res.json(userUpdated);
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUserById
};
