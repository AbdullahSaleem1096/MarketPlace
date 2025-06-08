import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {email,password} = reqBody;
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User doesnot exists"});
        }
        console.log("user exists");

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json(
                {
                    error:"Invalid Password",
                    status:400

                }
            )
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }

        const token = await jwt.sign(tokenData, "Next1096"!,{expiresIn:"1d"})

        const response = NextResponse.json({
            message:"login successfull",
            success: true,
            role: user.role
        })
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response;
    }
    catch(err:any){
        return NextResponse.json(
            {error:err.message},
            {status:500}
        )
    }
}