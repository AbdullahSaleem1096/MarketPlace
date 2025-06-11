"use client"
import axios from "axios";
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    quantity: number;
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            router.push("/login");
        }
        catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products/get');
                if (response.data.success) {
                    setProducts(response.data.products);
                } else {
                    console.log("Error in fetching the data:", response.data.error);
                }
            }
            catch (error: any) {
                console.log("Error fetching products:", error.message);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Home</h2>
            <hr />
            <div>
                {products.map((product) => (
                    <div key={product._id}>
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
            <hr />
            <button onClick={logout}>Logout</button>
        </div>
    )
}