"use client"
import axios from "axios";
import {useRouter} from "next/navigation";


export default function home(){
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
    return (
        <div>
            <h2>home</h2>
            <hr />
            <button onClick={logout}>Logout</button>
        </div>
    )
}