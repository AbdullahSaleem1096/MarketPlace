import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModels';
import bcrypt from 'bcryptjs';
import { NextRequest,NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {username,email,password,role,phoneNumber,department,hostel,roomNumber} = reqBody;
    
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json(
                {error:"User already exists"},
                {status:400}
            )
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
    
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            role,
            phoneNumber,
            department,
            hostel,
            roomNumber
        })
    
        const savedUser = await newUser.save();
        return NextResponse.json({
            message:"User created successfully",
            success:true,
            savedUser
        })
    }
    catch(err:any){
        return NextResponse.json({
            error: err.message,
            status:500
        })
    }
}