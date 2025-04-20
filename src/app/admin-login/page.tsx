"use client";
import { loginThunk } from "@/features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const AdminLoginPage = () => {
  
    const dispatch = useAppDispatch()
    const {isAdmin,loading}=useAppSelector(state=>state.auth)
    console.log("isAdmin",isAdmin);
    const router = useRouter()
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(loginThunk(data))
  };

  useEffect(()=>{
    if(isAdmin){
        router.push('/dashboard')
    }
  },[isAdmin,router])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-indigo-600">
        Admin Login
      </h2>

      <div>
        <label className="block mb-1 text-gray-700 font-medium">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          className="w-full border text-gray-600 border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-gray-700 font-medium">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
          className="w-full border text-gray-600 border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
      >
        {loading?"loading":'Login'}
      </button>
    </form>
  );
};

export default AdminLoginPage;
