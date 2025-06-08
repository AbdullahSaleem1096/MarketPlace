import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  logo: { type: String },
  category: {
    type: String,
    enum: [
      'food',
      'beverages',
      'stationery',
      'electronics',
      'mobile accessories',
      'clothing',
      'shoes',
      'sports',
      'personal care',
      'room decor',
      'books',
      'health',
      'toiletries',
      'cleaning supplies',
      'gadgets',
      'computer accessories',
      'handmade crafts',
      'services',
      'grocery',
      'snacks',
      'gift items',
      'cosmetics',
      'repair',
      'event services',
      'digital products',
      'others'
    ],
  },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  socialMedia: {
    instagram: String,
    facebook: String,
    twitter: String
  },
  isDeliveryEnabled: { type: Boolean, default: false },
  address: {
    hostel: { type: String, required: true },
    roomNumber: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Check if the model exists before creating a new one
const Store = mongoose.models.Store || mongoose.model('Store', storeSchema);

export default Store;