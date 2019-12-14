const _ = require('lodash');
const HttpStatus = require('http-status-codes');
const { resolveScopedContainerFromRequest } = require('../../config/ioc-container');
const { getDefaultSearchFromQuery } = require('../helpers/mappers');

const mapUserToResponse = (user) => _.omit(user.toObject(), ['password', '__v']);

const addUser = async (req, res) => {
  const userService = resolveScopedContainerFromRequest(req, 'userService');
  const userAdded = await userService.addUser(req.body);

  res.status(HttpStatus.CREATED).json(mapUserToResponse(userAdded));
};

const getUserById = async (req, res) => {
  const userService = resolveScopedContainerFromRequest(req, 'userService');
  const user = await userService.getUserById(req.params.userId);

  res.json(mapUserToResponse(user));
};

const getUsers = async (req, res) => {
  const userService = resolveScopedContainerFromRequest(req, 'userService');
  const query = getDefaultSearchFromQuery(req.query);
  const users = await userService.getUsers(query);
  users.results = users.results.map(mapUserToResponse);

  res.json(users);
};

const updateUserById = async (req, res) => {
  const userService = resolveScopedContainerFromRequest(req, 'userService');
  const userUpdated = await userService.updateUser({ _id: req.params.userId, ...req.body });

  res.json(mapUserToResponse(userUpdated));
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUserById,
};
