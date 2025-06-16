import { NextRequest, NextResponse } from 'next/server';
import Wishlist from '@/models/wishlistModels';
import { connect } from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helper/getDataFromToken';

export async function POST(req: NextRequest) {
  try {
    await connect();
    const decodedToken = await getDataFromToken();
    const userId = decodedToken.id;
    const { productId } = await req.json();

    // Find user's wishlist or create new one
    let wishlist = await Wishlist.findOne({ userId });
    
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    // Check if product already in wishlist
    if (wishlist.products.includes(productId)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Product already in wishlist' 
      });
    }

    // Add product to wishlist
    wishlist.products.push(productId);
    await wishlist.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Product added to wishlist',
      wishlist 
    });
  } catch (error: any) {
    console.error('Wishlist error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
