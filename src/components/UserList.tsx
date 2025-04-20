"use client";

import { deleteUserThunk } from "@/features/user/userThunk";
import { useAppDispatch } from "@/store/hooks";
import { userTs } from "@/types/user";
import React, { useState } from "react";

const UserList = ({
  users,
  onUserSelect,
}: {
  users: userTs[];
  onUserSelect: (user: userTs) => void;
}) => {
  const [search, setSearch] = useState("");
//   console.log('users in list',users);
const dispatch=useAppDispatch()
  const filterusers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (userId: string) => {
    dispatch(deleteUserThunk(userId));
    alert("deleted")
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-400">
        All Users
      </h2>
      <input
        type="text"
        placeholder="Search User"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 mb-6 border rounded text-blue-600"

      />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filterusers.length > 0 ? (
          filterusers?.map((user, index) => (
            <div
              key={index}
              onClick={() => onUserSelect(user)}
              className="bg-white px-4 shadow-md rounded-xl flex justify-between hover:shadow-lg transition duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {user.name} 
              </h3>
              <button onClick={() => handleDelete(user.$id)} className="text-red-600 ">Delete</button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default UserList;
