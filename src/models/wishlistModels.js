import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

// Check if the model exists before creating a new one
const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;