import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModels';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // Connect to database
        await connect();
        console.log("Database connected");

        // Get request body
        const reqBody = await request.json();
        console.log("Request body:", reqBody);
        
        const {username, email, password, role, phoneNumber, department, hostel, roomNumber} = reqBody;

        // Validate required fields
        if (!username || !email || !password || !role || !department || !hostel || !roomNumber) {
            return NextResponse.json(
                {error: "All fields are required"},
                {status: 400}
            );
        }

        // Check if user exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}
            );
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            phoneNumber,
            address: {
                department,
                hostel,
                roomNumber
            }
        });

        // Save user
        const savedUser = await newUser.save();
        console.log("User saved successfully:", savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser: {
                username: savedUser.username,
                email: savedUser.email,
                role: savedUser.role
            }
        });
    }
    catch(err: any) {
        console.error("Signup error:", err);
        return NextResponse.json({
            error: err.message || "Internal server error",
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }, {status: 500});
    }
}