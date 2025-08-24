'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';


export default function SignupPage() {
    const [user , setUser] = useState({
        email : "",
        username : "",
        password : ""
    })

    const[disableButton , setDisableButton] = React.useState(false);
    const[loading , setLoading] = React.useState(false);

    const router = useRouter();

    const onSignUp = async() => {
    
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("Signup success",response.data);
            router.push("/login");
            

        } catch (error :any) {
            console.log("signup failed", error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setDisableButton(false)
        }else{
            setDisableButton(true)
        }
    },[user])

  return (
    
    <div className='flex flex-col items-center justify-center'>
        <h1 className='font-serif font-bold text-center text-4xl mb-15'>Signup Page</h1>
        <hr/>
        <div className="flex flex-col  gap-4 p-6 w-80 bg-transparent border border-gray-400 rounded-2xl shadow-md">  
            <h1 className='text-center mb-5 font-semibold text-3xl'>{loading ? "Processing" : "Signup"}</h1>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-white font-semibold mb-1">
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter username"
              className="w-full px-3 py-2 rounded-lg border border-gray-400 bg-transparent text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white font-semibold mb-1">
              Email:
            </label>
            <input
              id="email"
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter email"
              className="w-full px-3 py-2 rounded-lg border border-gray-400 bg-transparent text-white        placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor='password' className='text-white font-semibold mb-1'>
                Password : 
            </label>
            <input 
            id='password'
            type='password'
            value={user.password}
            onChange={(e) => setUser({...user , password : e.target.value})}
            placeholder='password'
            className='w-full px-3 py-2 rounded-lg border border-gray-400 bg-transparent text-white        placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>
          <button
            onClick={onSignUp}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{disableButton ? "Fill first full Details" : "Signup"}</button>
            <Link href="/login" className='text-blue-400 underline text-center'>Visit login page</Link>
        </div>
    </div>
  )
}
