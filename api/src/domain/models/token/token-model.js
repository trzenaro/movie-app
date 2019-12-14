const mongoose = require('mongoose');

const { Schema } = mongoose;

const TokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    value: { type: String, index: true },
    type: { type: String, enum: ['TOKEN', 'REFRESH_TOKEN'], index: true },
  },
  {
    collection: 'tokens',
    timestamps: true,
  },
);

module.exports = mongoose.model('Token', TokenSchema);
