const { CategoryModel } = require('../../models');
const buildPaginatedAndSortedQueryRunner = require('../../../infrastructure/mongodb-query-runner-builder');

class CategoryService {
    constructor() {
        this._runPaginatedAndSortedQuery = buildPaginatedAndSortedQueryRunner(CategoryModel);
    }

    async getCategories({ filters, pagination, assortment }) {
        return await this._runPaginatedAndSortedQuery({ filters, pagination, assortment });
    }

    async getCategoryById(categoryId) {
        const category = await CategoryModel.findOne({ _id: categoryId });
        return category;
    }

    async addCategory(categoryPayload) {
        const categoryAdded = await CategoryModel.create(categoryPayload);;
        return categoryAdded;
    }

    async updateCategory(categoryPayload) {
        const { _id, ...category } = categoryPayload
        const categoryUpdated = await CategoryModel.findOneAndUpdate({ _id }, { $set: category }, { new: true });
        return categoryUpdated;
    }
}

module.exports = CategoryService;