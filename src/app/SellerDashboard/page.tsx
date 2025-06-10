"use client"
import axios from "axios";
import {useRouter} from "next/navigation";


export default function SellerDashboard(){
    const router = useRouter();
    const logout = async () => {
        try{
            await axios.get('/api/users/logout');
            router.push("/login");
        }
        catch(error:any){
            console.log(error.message);
        }
    }
    const AddProduct = async () => {
        try {
            router.push('/AddProduct');
        }
        catch(error:any){
            console.log(error.message);
        }
    }
    return (
        <div>
            <h2>Seller Dashboard</h2>
            <hr />
            <button onClick={logout}>Logout</button>
            <button onClick={AddProduct}>Add Product</button>
        </div>
    )
}