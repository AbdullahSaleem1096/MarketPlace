import {connect} from "@/dbConfig/dbConfig";
import Store from "@/models/storeModels";
import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decodedToken: any = jwt.verify(token,"Next1096"!);
    const sellerId = decodedToken.id;

    if (!sellerId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      logo,
      category,
      contactEmail,
      contactPhone,
      instagram,
      facebook,
      twitter,
      isDeliveryEnabled,
      hostel,
      roomNumber
    } = body;

    const newStore = await Store.create({
      name,
      description,
      sellerId,
      logo,
      category,
      contactEmail,
      contactPhone,
      socialMedia:{
        instagram,
        facebook,
        twitter
      },
      isDeliveryEnabled,
      address:{
        hostel,
        roomNumber
      }
    });

    return NextResponse.json({
      message: "Store created successfully",
      success: true,
      store: newStore
    });
  } catch (error: any) {
    console.error("Store creation error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
