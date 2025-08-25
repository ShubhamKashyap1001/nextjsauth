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
      const response = await axios.post("/api/users/AboutMe")
      console.log(response.data.data._id)
      setData(response.data.data._id);

    } catch ( error : any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const Logout = async() => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login")

    } catch (error : any) {
      console.log(error.message);
      toast.error(error.message)
      
    }
  }

  return (
    <div className='flex flex-col justify-center items-center m-5 py-2 min-h-screen'>
      <h1 className='font-bold text-3xl font-sans mb-4'>Profile</h1>
      <hr/>
      
      <div className='flex flex-col r items-center p-4 border-2 rounded-2xl border-white bg-transparent border-r-2'>
      <h2 className='mb-4'>Profile Page</h2>
      <h2>{data === "nothing" ? "Nothing" : <Link href = {`/profile/${data}`}>{data}</Link>}</h2>
      <hr/>

      <button
      onClick={Logout}
      className='bg-blue-400 font-semibold border-2 px-4 py-2 rounded-2xl m-4'> logout </button>

      <button
      onClick={getUserDetails}
      className='bg-green-400 font-semibold border-2 px-4 py-2 rounded-2xl m-4'>Get User Details</button>
    </div>
    </div>
  )
}