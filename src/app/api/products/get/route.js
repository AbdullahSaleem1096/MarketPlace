import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModels";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connect();
        const products = await Product.find({ isAvailable: true })
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            products
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}