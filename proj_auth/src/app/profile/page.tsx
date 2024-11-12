"use client";

import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function profile() {

  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successful");
      router.push("/login")
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-2'>
        <h1 className='my-4'>Profile</h1>
        <hr /> 
        <button 
          className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded'
          onClick={logout}
        >
          Logout
        </button>
    </div>
  )
}

export default profile