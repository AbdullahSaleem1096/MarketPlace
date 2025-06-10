"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    quantity: ""
  });
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Nustify-product-images'); // Your unsigned upload preset name

    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dpvw5q0lx/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      setProduct(prev => ({
        ...prev,
        image: response.data.secure_url
      }));
    } catch (error: any) {
      console.error("Image upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.quantity || !product.image) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/products/add", product);
      console.log("Product added:", response.data);
      alert("Product added successfully");
      router.push("/SellerDashboard");
    } catch (error: any) {
      console.error("Error adding product:", error.response?.data?.error || error.message);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>Product Name *</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={(e) => setProduct({...product, name: e.target.value})}
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={(e) => setProduct({...product, description: e.target.value})}
            placeholder="Enter product description"
          />
        </div>

        <div>
          <label>Price *</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={(e) => setProduct({...product, price: e.target.value})}
            placeholder="Enter product price"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label>Category</label>
          <select
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="beverages">Beverages</option>
            <option value="stationery">Stationery</option>
            <option value="electronics">Electronics</option>
            <option value="mobile accessories">Mobile Accessories</option>
            <option value="clothing">Clothing</option>
            <option value="shoes">Shoes</option>
            <option value="sports">Sports</option>
            <option value="personal care">Personal Care</option>
            <option value="room decor">Room Decor</option>
            <option value="books">Books</option>
            <option value="health">Health</option>
            <option value="toiletries">Toiletries</option>
            <option value="cleaning supplies">Cleaning Supplies</option>
            <option value="gadgets">Gadgets</option>
            <option value="computer accessories">Computer Accessories</option>
            <option value="handmade crafts">Handmade Crafts</option>
            <option value="services">Services</option>
            <option value="grocery">Grocery</option>
            <option value="snacks">Snacks</option>
            <option value="gift items">Gift Items</option>
            <option value="cosmetics">Cosmetics</option>
            <option value="repair">Repair</option>
            <option value="event services">Event Services</option>
            <option value="digital products">Digital Products</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div>
          <label>Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          {product.image && (
            <div>
              <p>Image uploaded successfully!</p>
              <img src={product.image} alt="Preview" style={{ maxWidth: '200px' }} />
            </div>
          )}
        </div>

        <div>
          <label>Quantity *</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={(e) => setProduct({...product, quantity: e.target.value})}
            placeholder="Enter quantity"
            required
            min="0"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

