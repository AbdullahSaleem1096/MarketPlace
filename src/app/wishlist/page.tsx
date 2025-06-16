'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get('/api/wishlist/get');
        if (res.data.success) {
          setProducts(res.data.products);
        } else {
          alert(res.data.message || 'Failed to fetch wishlist');
        }
      } catch (err: any) {
        alert('Error: ' + err.message);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div>
      <h2>Your Wishlist</h2>
      {products.length === 0 && <p>No products in your wishlist.</p>}
      <div>
        {products.map((product) => (
          <div key={product._id} onClick={() => router.push(`/ProductDetails/${product._id}`)}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
