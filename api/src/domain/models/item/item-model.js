const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    name: { type: String, required: true, text: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    imageUrl: { type: String },
  },
  {
    collection: 'items',
    timestamps: true,
  },
);

module.exports = mongoose.model('Item', ItemSchema);
