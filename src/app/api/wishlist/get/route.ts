import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Wishlist from '@/models/wishlistModels';
import { getDataFromToken } from '@/helper/getDataFromToken';

connect();

export async function GET(req: NextRequest) {
  try {
    const decodedToken = await getDataFromToken();
    const userId = decodedToken.id;

    const wishlist = await Wishlist.findOne({ userId }).populate('products');

    return NextResponse.json({ success: true, products: wishlist?.products || [] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
