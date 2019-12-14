const _ = require('lodash');
const HttpStatus = require('http-status-codes');
const { resolveScopedContainerFromRequest } = require('../../config/ioc-container');
const { getDefaultSearchFromQuery } = require('../helpers/mappers');

const mapItemToResponse = (item) => _.omit(item.toObject(), ['__v', 'category.__v', 'category.createdAt', 'category.updatedAt']);

const addItem = async (req, res) => {
  const itemService = resolveScopedContainerFromRequest(req, 'itemService');
  const itemAdded = await itemService.addItem(req.body);

  res.status(HttpStatus.CREATED).json(mapItemToResponse(itemAdded));
};

const getItemById = async (req, res) => {
  const itemService = resolveScopedContainerFromRequest(req, 'itemService');
  const item = await itemService.getItemById(req.params.itemId);

  res.json(mapItemToResponse(item));
};

const getItems = async (req, res) => {
  const itemService = resolveScopedContainerFromRequest(req, 'itemService');
  const query = getDefaultSearchFromQuery(req.query);
  const items = await itemService.getItems(query);
  items.results = items.results.map(mapItemToResponse);

  res.json(items);
};

const updateItemById = async (req, res) => {
  const itemService = resolveScopedContainerFromRequest(req, 'itemService');
  const itemUpdated = await itemService.updateItem({ _id: req.params.itemId, ...req.body });

  res.json(mapItemToResponse(itemUpdated));
};

module.exports = {
  addItem,
  getItems,
  getItemById,
  updateItemById,
};
