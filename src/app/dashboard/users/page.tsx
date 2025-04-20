"use client";

import UserList from "@/components/UserList";
import { createUserThunk, getUsersThunk } from "@/features/user/userThunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userTs } from "@/types/user";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const {users}=useAppSelector(state=>state.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<userTs>();

  const onSubmit: SubmitHandler<userTs> = (data) => {
    dispatch(createUserThunk(data));
    alert("created")
    reset()
  };
  useEffect(()=>{
    dispatch(getUsersThunk())
  },[dispatch])

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-gray-800 shadow-xl rounded-xl mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">Add User</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              {...register("name", { required: true })}
              placeholder="Enter name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">Name is required</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              {...register("email", { required: true })}
              placeholder="Enter email"
              type="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">Email is required</p>
            )}
          </div>

          {/* Position Field */}
          <div>
            <label className="block font-medium mb-1">Position</label>
            <input
              {...register("position", { required: true })}
              placeholder="Enter position"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.position && (
              <p className="text-sm text-red-500 mt-1">Position is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* User List */}
      <div className="mt-10">
        <UserList onUserSelect={(user) => console.log("Selected user:", user)} users={users} />
      </div>
    </>
  );
};

export default UsersPage;
