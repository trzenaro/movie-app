const { ItemModel } = require('../../models');

class ItemService {
    constructor({ categoryService }) {
        this._categoryService = categoryService
    }

    async getItems(filters) {
        return ItemModel.find({ ...filters });
    }

    async getItemById(itemId) {
        const item = await ItemModel.findOne({ _id: itemId });
        return item;
    }

    async addItem(itemPayload) {
        const itemAdded = await ItemModel.create(itemPayload);;
        return itemAdded;
    }

    async updateItem(itemPayload) {
        const { _id, ...item } = itemPayload
        const itemUpdated = await ItemModel.findOneAndUpdate({ _id }, { $set: item }, { new: true });
        return itemUpdated;
    }
}

module.exports = ItemService;