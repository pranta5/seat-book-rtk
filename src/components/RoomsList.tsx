"use client";

import { deleteRoomThunk, fetchRoomsThunk } from "@/features/rooms/roomThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import Link from "next/link";

const RoomsList = () => {
  const dispatch = useAppDispatch();
  const { rooms, loading, error } = useAppSelector((state) => state.rooms);
  const { isAdmin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchRoomsThunk());
  }, [dispatch]);

  const handleDelete = (rooId: string) => {
    dispatch(deleteRoomThunk(rooId));
    alert("room delete");
  };

  if (loading) return "loading....";
  if (error) return <p>{error}</p>;
  const textposition = isAdmin?"justify-between":"justify-center"
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-400">
        All Rooms
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {rooms?.map((room) => (
          <div
            key={room.$id}
            className={`bg-white px-4 flex ${textposition} rounded-lg text-center shadow-md hover:shadow-xl transition duration-200`}
          >
            {" "}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-1">
                <Link
                  href={`/rooms/${room.$id}`}
                  className="hover:underline text-blue-600"
                >
                  {room.name}
                </Link>
              </h3>
              <p className="text-sm text-gray-500">
                Layout size: {room.layout.length} x{" "}
                {room.layout[0]?.length || 0}
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={() => {
                  handleDelete(room.$id);
                }}
                className="text-red-600"
              >
                delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsList;
