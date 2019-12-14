const { ItemModel } = require('../../models');
const { CustomError } = require('../../../utils/error-types');

const buildPaginatedAndSortedQueryRunner = require('../../../infrastructure/mongodb-query-runner-builder');

class ItemService {
  constructor({ categoryService }) {
    this._categoryService = categoryService;
    this._runPaginatedAndSortedQuery = buildPaginatedAndSortedQueryRunner(ItemModel, { populate: 'category' });
  }

  async getItems({ filters, pagination, assortment }) {
    //if (Math.random() > 0.5) throw new Error('ferrou');

    let { q: textSearch, ...query } = filters;
    if (textSearch) {
      query = { ...query, $text: { $search: textSearch } };
    }

    return this._runPaginatedAndSortedQuery({ filters: query, pagination, assortment });
  }

  async getItemById(itemId) {
    const item = await ItemModel.findOne({ _id: itemId }).populate('category');
    if (!item) throw new CustomError('ITEM_NOT_FOUND', 'Item não encontrado');
    return item;
  }

  async addItem(itemPayload) {
    await this._validateCategoryExists(itemPayload.category);
    const itemAdded = await ItemModel.create(itemPayload);
    return itemAdded;
  }

  async updateItem(itemPayload) {
    const { _id, category, ...itemModifications } = itemPayload;
    const itemToBeUpdated = await this.getItemById(_id);

    if (category) {
      await this._validateCategoryExists(category);
      itemToBeUpdated.category = category;
    }

    Object.assign(itemToBeUpdated, itemModifications);
    return itemToBeUpdated.save();
  }

  async _validateCategoryExists(category) {
    await this._categoryService.getCategoryById(category);
  }
}

module.exports = ItemService;
