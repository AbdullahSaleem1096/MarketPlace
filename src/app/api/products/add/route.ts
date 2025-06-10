import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModels";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            return NextResponse.json({ error: "No token provided" }, { status: 401 });
        }

        const decodedToken: any = jwt.verify(token, "Next1096"!);
        const sellerId = decodedToken.id;

        if (!sellerId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const body = await request.json();
        const { name, description, price, category, images, quantity } = body;

        const newProduct = await Product.create({
            sellerId,
            name,
            description,
            price: parseFloat(price),
            category,
            images,
            quantity: parseInt(quantity),
            isAvailable: true
        });

        return NextResponse.json({
            message: "Product added successfully",
            success: true,
            product: newProduct
        });
    } catch (error: any) {
        console.error("Product creation error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
} 