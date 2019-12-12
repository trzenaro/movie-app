const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        name: { type: String, required: true, text: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
        isActive: { type: Boolean }
    },
    {
        collection: 'items',
        timestamps: true
    }
);

module.exports = mongoose.model('Item', ItemSchema);