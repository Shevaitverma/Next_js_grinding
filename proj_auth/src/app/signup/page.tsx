"use client";

import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function signupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  })

  const [buttonDisabled, setbuttonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)


  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user);
      console.log("sugn-up success", response.data);
      router.push('/login')
    } catch (error:any) {
      console.log("sign-up failed", error.message);
      toast.error(error.message)
    }finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setbuttonDisabled(false);
    } else{
      setbuttonDisabled(true);
    }
  }, [user])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">{loading?"Processing...":"Sign-up"}</h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">login here</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              onClick={async (e)=> {
                e.preventDefault();
                await onSignup();
              }}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {buttonDisabled ? ".":"sign-up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default signupPage