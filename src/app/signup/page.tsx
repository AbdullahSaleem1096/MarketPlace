"use client";
import Link from "next/link";
//import React, {useEffect,useState} from "react";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function SignUpPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        username: "",
        email: "",
        password: "",
        role: "",
        phoneNumber:"",
        department:"",
        hostel:"",
        roomNumber:""
    })
    const onSignUp = async () => {
        try{
            const response = await axios.post("/api/users/signup",user);
            console.log(response.data);
            router.push("/login");
        }
        catch(error:any){
            console.log("SignUp failed",error);
        }
    }
    return (
        <div>
            <h1>SignUp</h1>
            <hr />

            <label htmlFor="username">Username</label>
            <input 
            id="username"
            value={user.username}
            type="text"
            placeholder="username"
            onChange = {(e)=>setUser({...user,username:e.target.value})}
            />

            <label htmlFor="email">email</label>
            <input
            id="email"
            value={user.email}
            type="text"
            placeholder="email"
            onChange = {(e)=>setUser({...user,email:e.target.value})}
            />

            <label htmlFor="password">Password</label>
            <input 
            id="password"
            value={user.password}
            type="text"
            placeholder="password"
            onChange = {(e)=>setUser({...user,password:e.target.value})}
            />

            <label htmlFor="username">role</label>
            <input 
            id="role"
            value={user.role}
            type="text"
            placeholder="role"
            onChange = {(e)=>setUser({...user,role:e.target.value})}
            />

            <label htmlFor="username">Phone Number</label>
            <input 
            id="phoneNumber"
            value={user.phoneNumber}
            type="text"
            placeholder="phoneNumber"
            onChange = {(e)=>setUser({...user,phoneNumber:e.target.value})}
            />

            <label htmlFor="username">Department</label>
            <input 
            id="department"
            value={user.department}
            type="text"
            placeholder="department"
            onChange = {(e)=>setUser({...user,department:e.target.value})}
            />

            <label htmlFor="username">hostel</label>
            <input 
            id="hostel"
            value={user.hostel}
            type="text"
            placeholder="hostel"
            onChange = {(e)=>setUser({...user,hostel:e.target.value})}
            />


            <label htmlFor="username">roomNumber</label>
            <input 
            id="roomNumber"
            value={user.roomNumber}
            type="text"
            placeholder="roomNumber"
            onChange = {(e)=>setUser({...user,roomNumber:e.target.value})}
            />
            <button onClick={onSignUp}>SignUp</button>
            <Link href="/login">Visit login page</Link>
        </div>
    )
}