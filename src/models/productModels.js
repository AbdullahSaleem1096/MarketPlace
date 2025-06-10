const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: { type: String, required: true, index: true },
  description: String,
  price: { type: Number, required: true, index: true },
  category: { type: String, index: true },
  images: String,
  quantity: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true},
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);