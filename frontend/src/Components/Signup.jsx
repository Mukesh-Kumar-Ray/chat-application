import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { NavLink } from 'react-router';
import { useAuth } from "../Context/AuthProvider.jsx";

const Signup = () => {
  const [authUser, setAuthUser] = useAuth();
  const form =useForm();
  const {register, handleSubmit ,formState:{errors} }=form;

  const formsubmit = async (data)=>{
    // console.log(data);
    // console.log(form);

    const userInfo = {
      fullname: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
   // console.log(userInfo)

    try {
       const response = await axios.post("/api/user/Signup", userInfo);
       //console.log(response.data);
       if (response.data) {
        alert("Signup successful");
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data)
      }
    } catch (error) {
     console.log(error)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center">CHAT APP</h1>
        <h2 className="text-xl text-gray-600 text-center mt-2">Signup</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(formsubmit)}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username",{required:{value:true , message:"pls fill good name..."}})}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-sm text-red-500 mt-1">{errors.username?.message}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email" ,{required:{value:true , message:"pls fill Email..."}})}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
             <p className="text-sm text-red-500 mt-1">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password",{required:{value:true , message:"pls fill password..."}})}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-sm text-red-500 mt-1">{errors.password ?.message}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type ="password"
              placeholder="Confirm your password"
              {...register("confirmPassword",{required:{value:true ,message:"pls fill confirmpassword..."}})}
              className="mt-1 block  w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <NavLink to="/Login" className="text-indigo-600 hover:underline focus:outline-none focus:ring-1 focus:ring-indigo-500"> Login</NavLink>
          </p>
        </div>
      </div>
    </div>

  )
}

export default Signup