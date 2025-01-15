import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const form = useForm();
  const {register, handleSubmit ,formState:{errors} }=form;

  const formsubmit = async (data)=>{
    const userInfo = {
        email: data.email,
        password: data.password,
      };
      //console.log(userInfo);

      try {
        const response = await axios.post("/api/user/Login", userInfo);
        //console.log(response);
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        window.location.reload();

      } catch (error) {
        console.log(error.response.data.message)
      }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          CHAT APP
        </h1>
        <h2 className="text-xl text-gray-600 text-center mt-2">Login</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(formsubmit)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email",{required:{value:true , message:"pls fill email..."}})}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-sm text-red-500 mt-1">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password",{required:{value:true , message:"pls fill password..."}})}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-sm text-red-500 mt-1">{errors.password?.message}</p>
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
            Have not an account?{' '}
            <NavLink to="/Signup"  className="text-indigo-600 hover:underline focus:outline-none focus:ring-1 focus:ring-indigo-500">Signup</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
