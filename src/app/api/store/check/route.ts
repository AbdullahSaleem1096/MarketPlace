import { connect } from "@/dbConfig/dbConfig";
import Store from "@/models/storeModels";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest) {
    try {
        await connect();
        console.log("Database connected for store check");
        
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            console.log("No token found in cookies");
            return NextResponse.json({ error: "No token provided" }, { status: 401 });
        }

        const decodedToken:any = jwt.verify(token,"Next1096"!);
        const userId = decodedToken.id;
        
        if (!userId) {
            console.log("No user ID found in token");
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        console.log("Checking store for user ID:", userId);
        const store = await Store.findOne({ sellerId: userId });
        console.log("Store check result:", store ? "Store found" : "No store found");

        return NextResponse.json({
            hasStore: !!store,
            store: store || null
        });
    } catch (error: any) {
        console.error("Store check error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
} 