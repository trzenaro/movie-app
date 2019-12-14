const { CategoryModel } = require('../../models');
const { CustomError } = require('../../../utils/error-types');
const buildPaginatedAndSortedQueryRunner = require('../../../infrastructure/mongodb-query-runner-builder');

class CategoryService {
  constructor() {
    this._runPaginatedAndSortedQuery = buildPaginatedAndSortedQueryRunner(CategoryModel);
  }

  async getCategories({ filters, pagination, assortment }) {
    return this._runPaginatedAndSortedQuery({ filters, pagination, assortment });
  }

  async getCategoryById(categoryId) {
    const category = await CategoryModel.findOne({ _id: categoryId });
    if (!category) throw new CustomError('CATEGORY_NOT_FOUND', 'Categoria não encontrada');
    return category;
  }

  async addCategory(categoryPayload) {
    const categoryAdded = await CategoryModel.create(categoryPayload);
    return categoryAdded;
  }

  async updateCategory(categoryPayload) {
    const { _id, ...categoryModifications } = categoryPayload;
    const categoryToBeUpdated = await this.getCategoryById(_id);

    Object.assign(categoryToBeUpdated, categoryModifications);
    return categoryToBeUpdated.save();
  }
}

module.exports = CategoryService;
