const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const { resolveScopedContainerFromRequest } = require('../../config/ioc-container');
const { getDefaultSearchFromQuery } = require('../helpers/mappers');

const mapCategoryToResponse = (category) => _.omit(category.toObject(), ['__v']);

const addCategory = async (req, res) => {
  const categoryService = resolveScopedContainerFromRequest(req, 'categoryService');
  const categoryAdded = await categoryService.addCategory(req.body);

  res.status(HttpStatus.CREATED).json(mapCategoryToResponse(categoryAdded));
};

const getCategoryById = async (req, res) => {
  const categoryService = resolveScopedContainerFromRequest(req, 'categoryService');
  const category = await categoryService.getCategoryById(req.params.categoryId);

  res.json(mapCategoryToResponse(category));
};

const getCategories = async (req, res) => {
  const categoryService = resolveScopedContainerFromRequest(req, 'categoryService');
  const query = getDefaultSearchFromQuery(req.query);
  const categories = await categoryService.getCategories(query);
  categories.results = categories.results.map(mapCategoryToResponse);

  res.json(categories);
};

const updateCategoryById = async (req, res) => {
  const categoryService = resolveScopedContainerFromRequest(req, 'categoryService');
  const categoryUpdated = await categoryService.updateCategory({ _id: req.params.categoryId, ...req.body });

  res.json(mapCategoryToResponse(categoryUpdated));
};

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
};
