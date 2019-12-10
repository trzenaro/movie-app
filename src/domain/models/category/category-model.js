const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: { type: String, required: true },
        isActive: { type: Boolean }        
    },
    {
        collection: 'categories',
        timestamps: true
    }
);

module.exports = mongoose.model('Category', CategorySchema);