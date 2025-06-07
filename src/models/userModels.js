import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true },
  email:    { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, minlength:6 },
  role:     { type: String, enum: ['buyer', 'seller'], required: true, index: true },
  phoneNumber: String,
  address: {
    department: { type: String, required: true },
    hostel: { type: String, required: true },
    roomNumber: { type: String, required: true }
  },
  wallet: { type: Number, default: 0 },
  verifyToken: String,
  VerifyTokenExpiry: String, 
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

// Check if the model exists before creating a new one
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;