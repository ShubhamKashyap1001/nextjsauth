"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
//import { useRouter } from 'next/router';
import Link from 'next/link';

export default function VerifyEmailPage() {

    const [token , setToken] = useState("");
    const [verified , setVerified] = useState(false);
    const [error , setError] = useState(false);

    //const router = useRouter();

    const VerifyUserEmail = async() => {
        try {
            await axios.post("/api/users/verifyemail" , {token});
            setVerified(true);
            setError(false);

        } catch (error : any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {

        //first approach using nextjs
        // const {query} = router;
        // const urlToken = query.token;
        // if (typeof urlToken === "string") {
        //     setToken(urlToken);
        // } else if (Array.isArray(urlToken) && urlToken.length > 0) {
        //     setToken(urlToken[0]);
        // } else {
        //     setToken("");
        // }

        //second approach using javascript
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");

    },[])

    useEffect(() => {
        VerifyUserEmail();
        setError(false);
    },[token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <div className='flex flex-col '>
            <h2 className='text-center text-4xl mt-8'>Verified Token</h2>
            <h2 className="p-2 rounded-2xl bg-orange-500 text-black mt-8">{token ?`${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className='text-green-600 text-3xl text-center font-serif font-semibold mt-8'>Verified Email</h2>
                    <Link href='/login'
                    className='text-center flex justify-center align-middle bg-blue-500 w-40 rounded-2xl px-2 py-2 font-bold mt-5 '>
                        login
                    </Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className='text-red-600 text-center font-semibold font-serif mt-8'>Not Verified : Error</h2>
                </div>
            )}
        </div>
    </div>
  )
}
