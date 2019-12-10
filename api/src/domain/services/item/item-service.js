const { ItemModel } = require('../../models');
const buildPaginatedAndSortedQueryRunner = require('../../../infrastructure/mongodb-query-runner-builder');

class ItemService {
    constructor() {
        this._runPaginatedAndSortedQuery = buildPaginatedAndSortedQueryRunner(ItemModel);
    }

    async getItems({ filters, pagination, assortment }) {
        return await this._runPaginatedAndSortedQuery({ filters, pagination, assortment });
    }

    async getItemById(itemId) {
        const item = await ItemModel.findOne({ _id: itemId });
        return item;
    }

    async addItem(itemPayload) {
        const itemAdded = await ItemModel.create(itemPayload);
        return itemAdded;
    }

    async updateItem(itemPayload) {
        const { _id, ...item } = itemPayload
        const itemUpdated = await ItemModel.findOneAndUpdate({ _id }, { $set: item }, { new: true });
        return itemUpdated;
    }
}

module.exports = ItemService;