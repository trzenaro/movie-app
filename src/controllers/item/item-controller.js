const HttpStatus = require('http-status-codes');
const { resolveScopedContainerFromRequest } = require('../../config/ioc-container');
const { CustomError } = require('../../utils/error-types');

const addItem = async (req, res) => {
  const itemService = resolveScopedContainerFromRequest(req, 'itemService');
  const itemAdded = await itemService.addItem(req.body);
  res.status(HttpStatus.CREATED).json(itemAdded);
};

const getItemById = async (req, res) => {
  const itemService = resolveScopedContainerFromRequest(req, 'itemService');
  const item = await itemService.getItemById(req.params.itemId);
  if (!item) throw new CustomError('ITEM_NOT_FOUND', 'Item não encontrado')
  res.json(item);
};

const getItems = async (req, res) => {
  const itemService = resolveScopedContainerFromRequest(req, 'itemService');

  const { _id, category } = req.query;
  const filters = {};
  if (_id) filters._id = _id;
  if (category) filters.category = category;

  const items = await itemService.getItems(filters);
  res.json(items);
};

const updateItemById = async (req, res) => {
  const itemService = resolveScopedContainerFromRequest(req, 'itemService');
  const itemUpdated = await itemService.updateItem({ _id: req.params.itemId, ...req.body });
  if (!itemUpdated) throw new CustomError('ITEM_NOT_FOUND', 'Item não encontrado')
  res.json(itemUpdated);
};

module.exports = {
  addItem,
  getItems,
  getItemById,
  updateItemById
};
