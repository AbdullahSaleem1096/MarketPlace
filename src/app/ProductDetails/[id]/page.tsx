'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'

interface Product {
  name: string;
  price: number;
  description: string;
  quantity: number;
}

interface Store {
  name: string;
  hostel: string;
  roomNumber: string;
}

export default function OnlineStorePage() {
  const { id } = useParams()
  const router = useRouter()

  const [product, setProduct] = useState<Product | null>(null)
  const [store, setStore] = useState<Store | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`)
        const data = res.data

        if (data.success) {
          setProduct(data.product)
          setStore(data.store)
        } else {
          console.error("Failed to fetch product details:", data.message)
        }
      } catch (err: any) {
        console.error("Error fetching product data:", err.message)
      }
    }

    fetchProductDetails()
  }, [id])

  if (!product) return <div>Loading product...</div>

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <p>Quantity: {product.quantity}</p>

      {store && (
        <>
          <h2>Store Information</h2>
          <p>Store Name: {store.name}</p>
          <p>Hostel: {store.hostel}</p>
          <p>Room Number: {store.roomNumber}</p>
        </>
      )}

      <button onClick={() => router.push(`/store?sellerId=${id}`)}>
        Visit Seller's Store
      </button>

      <button onClick={() => router.push(`/chat?sellerId=${id}`)}>
        Contact Seller
      </button>
    </div>
  )
}