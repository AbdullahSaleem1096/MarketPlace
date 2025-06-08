"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateStore() {
  const router = useRouter();
  const [store, setStore] = useState({
    name: "",
    description: "",
    logo: "",
    category: "",
    contactEmail: "",
    contactPhone: "",
    facebook: "",
    instagram: "",
    twitter: "",
    isDeliveryEnabled: true,
    hostel: "",
    roomNumber: ""
  });

  const createStore = async () => {
    try {
      const response = await axios.post("/api/store/create", store);
      console.log(response.data);
      router.push("/SellerDashboard");
    } catch (error: any) {
      console.log("Store creation failed", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Create Store</h1>

      <input
        type="text"
        placeholder="Store Name"
        value={store.name}
        onChange={(e) => setStore({ ...store, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Store Description"
        value={store.description}
        onChange={(e) => setStore({ ...store, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Logo URL"
        value={store.logo}
        onChange={(e) => setStore({ ...store, logo: e.target.value })}
      />
      <select
        value={store.category}
        onChange={(e) => setStore({ ...store, category: e.target.value })}
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
      <input
        type="email"
        placeholder="Contact Email"
        value={store.contactEmail}
        onChange={(e) => setStore({ ...store, contactEmail: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Contact Phone"
        value={store.contactPhone}
        onChange={(e) => setStore({ ...store, contactPhone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Facebook (optional)"
        value={store.facebook}
        onChange={(e) => setStore({ ...store, facebook: e.target.value })}
      />
      <input
        type="text"
        placeholder="Instagram (optional)"
        value={store.instagram}
        onChange={(e) => setStore({ ...store, instagram: e.target.value })}
      />
      <input
        type="text"
        placeholder="Twitter (optional)"
        value={store.twitter}
        onChange={(e) => setStore({ ...store, twitter: e.target.value })}
      />
      <label>
        Enable Delivery?
        <input
          type="checkbox"
          checked={store.isDeliveryEnabled}
          onChange={(e) =>
            setStore({ ...store, isDeliveryEnabled: e.target.checked })
          }
        />
      </label>
      <input
        type="text"
        placeholder="Hostel Name"
        value={store.hostel}
        onChange={(e) => setStore({ ...store, hostel: e.target.value })}
      />
      <input
        type="text"
        placeholder="Room Number"
        value={store.roomNumber}
        onChange={(e) => setStore({ ...store, roomNumber: e.target.value })}
      />

      <button onClick={createStore}>Create Store</button>
    </div>
  );
}
