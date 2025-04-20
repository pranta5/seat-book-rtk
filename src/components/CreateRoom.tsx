"use client";
import { createRoomThunk } from "@/features/rooms/roomThunks";
import { useAppDispatch } from "@/store/hooks";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Seat, SeatStatus } from "@/types/rooms";

type inputs = {
  name: string;
  rows: number;
  cols: number;
};

const generateLayout = (rows: number, cols: number): Seat[][] => {
  return Array.from({ length: rows }, (_, rowIdx) =>
    Array.from({ length: cols }, (_, colIdx) => ({
      status: "vacant" as SeatStatus,
      label: `R${rowIdx + 1}C${colIdx + 1}`,
      userName:undefined
    }))
  );
};

const CreateRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<inputs>();

  const dispatch = useAppDispatch();

  const onsubmit: SubmitHandler<inputs> = (data) => {
    // console.log(data);
    const layout = generateLayout(data.rows,data.cols)
    dispatch(createRoomThunk({name:data.name,layout}));
    alert('submitted')
    reset()
  };

  return (
    <div className="bg-gray-800 mt-12 p-6 max-w-md mx-auto rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Room</h2>
      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        {/* Room Name */}
        <div>
          <label className="block font-medium mb-1">Room Name</label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Minimum 2 characters",
              },
            })}
            placeholder="Enter Room Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Rows */}
        <div>
          <label className="block font-medium mb-1">Rows</label>
          <input
            type="number"
            {...register("rows", { required: true, min: 1 })}
            placeholder="Enter number of rows"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.rows && (
            <p className="text-red-500 text-sm mt-1">Row is required</p>
          )}
        </div>

        {/* Columns */}
        <div>
          <label className="block font-medium mb-1">Columns</label>
          <input
            type="number"
            {...register("cols", { required: "Columns are required", min: 1 })}
            placeholder="Enter number of columns"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.cols && (
            <p className="text-red-500 text-sm mt-1">{errors.cols.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
