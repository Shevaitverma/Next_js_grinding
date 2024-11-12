"use client";

import React, { useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

function loginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: ""
  });

  const [buttonDisabled, setbuttonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      // console.log("Login success", response.data);
      toast.success("login Success");
      router.push("/profile");
    } catch (error:any) {
      // console.log("Login failed", error.message);
      toast.error(error.message);
      
    }finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
      setbuttonDisabled(false);
    } else{
      setbuttonDisabled(true);
    }
  }, [user])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">{loading?"Processing...":"Login"}</h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign-up here</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6">
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
                await onLogin();
              }}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {buttonDisabled ? ".":"Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default loginPage