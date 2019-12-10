const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const { resolveScopedContainerFromRequest } = require('../../config/ioc-container');
const { CustomError } = require('../../utils/error-types');

const addCategory = async (req, res) => {
  const categoryService = resolveScopedContainerFromRequest(req, 'categoryService');
  const categoryAdded = await categoryService.addCategory(req.body);
  res.status(HttpStatus.CREATED).json(categoryAdded);
};

const getCategoryById = async (req, res) => {
  const categoryService = resolveScopedContainerFromRequest(req, 'categoryService');
  const category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) throw new CustomError('CATEGORY_NOT_FOUND', 'Categoria não encontrada')
  res.json(category);
};

const getCategories = async (req, res) => {
  const categoryService = resolveScopedContainerFromRequest(req, 'categoryService');

  const filters = {};
  if (req.query._id) filters._id = req.query._id;

  const categories = await categoryService.getCategories(filters);
  res.json(categories);
};

const updateCategoryById = async (req, res) => {
  const categoryService = resolveScopedContainerFromRequest(req, 'categoryService');
  const categoryUpdated = await categoryService.updateCategory({ _id: req.params.categoryId, ...req.body });
  if (!categoryUpdated) throw new CustomError('CATEGORY_NOT_FOUND', 'Categoria não encontrada')
  res.json(categoryUpdated);
};

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategoryById
};
