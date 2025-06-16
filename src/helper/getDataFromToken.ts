import jwt from 'jsonwebtoken';
import {cookies} from "next/headers";

export async function getDataFromToken(){
    try{
        const token = (await cookies()).get("token")?.value || "";
        
        if (!token) {
            throw new Error("Authentication token not found");
        }

        const decodedToken: any = jwt.verify(token, "Next1096");
        return decodedToken;
    }
    catch(error:any){
        throw new Error("Invalid or expired token")
    }
}