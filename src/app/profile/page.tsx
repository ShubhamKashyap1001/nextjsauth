"use client";

import React, { useState } from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function UserProfilePage() {

  const [data ,setData] = useState("nothing");

  const router = useRouter();

  const getUserDetails = async() => {
    try {
      const res = await axios.post('/api/users/aboutme')
      console.log(res.data.data._id)
      console.log(res.data);
      
      setData(res.data.data._id);

    } catch ( error : any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const Logout = async() => {
    try {
      await axios.get('/api/users/logout');
      toast.success("Logout successful");
      router.push("/login")

    } catch (error : any) {
      console.log(error.message);
      toast.error(error.message)
      
    }
  }

  return (
    <div className='flex flex-col justify-center items-center m-5 py-2 min-h-screen'>
      <h1 className=' flex flex-col font-bold text-3xl font-sans mb-4'>Profile</h1>
      <hr/>
      
      <div className='flex flex-col items-center p-4 border-2 rounded-2xl border-white bg-transparent'>
      
      {/* --- बदलाव यहाँ किया गया है --- */}
      <div className="flex items-center gap-4 mb-4">
        <p className='text-2xl font-sans'>Profile page</p>
        <h2 className="p-1 rounded bg-orange-500 text-black">
          {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
        </h2>
      </div>
      
      <hr className='w-full border-gray-600'/>

      <button
      onClick={Logout}
      className='bg-blue-400 font-semibold border-2 px-4 py-2 rounded-2xl m-4'> logout </button>

      <button
      onClick={getUserDetails}
      className='bg-green-700 font-semibold border-2 px-4 py-2 rounded-2xl m-4'>Get User Details</button>
    </div>
    </div>
  )
}