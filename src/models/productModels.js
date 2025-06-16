import mongoose from "mongoose";

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

// Check if the model exists before creating a new one
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;