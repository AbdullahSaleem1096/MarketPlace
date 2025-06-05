"use client"

import Link from "next/link";
import React from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function LoginPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email: "",
        password: ""
    })
    const onLogin = async () =>{
        try{
            const response = await axios.post("/api/users/login",user);
            console.log(response.data);
            router.push("/home");
        }
        catch(err:any){
            console.log('Login failed ',err.message);
        }
    }
    return (
        <div>
            <h1>Login</h1>

            <label htmlFor="email">Email</label>
            <input 
            type="text" 
            name="email" 
            id="email"
            value={user.email}
            onChange={(e)=> setUser({...user,email:e.target.value})}
            placeholder="email"
             />

            <label htmlFor="password">Password</label>
            <input 
            type="text" 
            name="password" 
            id="password"
            value={user.password}
            onChange={(e)=> setUser({...user,password:e.target.value})}
            placeholder="email"
             />
            <button onClick={onLogin}>Login</button>
        </div>
    )
}