const { CategoryModel } = require('../../models');

class CategoryService {
    async getCategories(filters) {
        return CategoryModel.find({ ...filters });
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