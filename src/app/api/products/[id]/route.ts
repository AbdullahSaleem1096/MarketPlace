import { NextRequest, NextResponse } from 'next/server';
import {connect} from "@/dbConfig/dbConfig";
import Product from '@/models/productModels';
import Store from '@/models/storeModels';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connect();

  try {
    const { id } = params

    // 1. Fetch the product and increment the view count
    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }


    // 3. Fetch the store info using sellerId
    const store = await Store.findOne({ sellerId: product.sellerId });


    return NextResponse.json({
      success: true,
      product:{
        name: product.name,
        price: product.price,
        description: product.description,
        quantity: product.quantity
      },
      store:{
        name: store.name,
        hostel: store.address.hostel,
        roomNumber: store.address.roomNumber
      },
      //reviews
    });
  } catch (error: any) {
    console.error("Error in GET /api/OnlineStore/get/[id]:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}