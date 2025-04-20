"use client";

import { Seat, SeatStatus } from "@/types/rooms";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import UserList from "./UserList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateRoomLayoutThunk } from "@/features/rooms/roomThunks";
import { getUsersThunk } from "@/features/user/userThunk";

interface SeatGridProps {
  seats: Seat[][];
  isAdmin: boolean;
  roomId: string;
}

const SeatGrid: React.FC<SeatGridProps> = ({ seats, isAdmin, roomId }) => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.user);
  console.log("user in grid", users);

  const [seatData, setSetData] = useState<Seat[][]>(seats);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<{
    row: number;
    col: number;
    seat: Seat;
  } | null>(null);

  const handleSeatClick = (seat: Seat, rowIdx: number, colIdx: number) => {
    const isAdminClickable = isAdmin;
    const isUserClickable = !isAdmin && seat.status === "allotted";

    if (isAdminClickable || isUserClickable) {
      setSelectedSeat({ row: rowIdx, col: colIdx, seat });
      setShowModal(true);
    }
  };
  const updateSeatStatus = (status: SeatStatus) => {
    if (!selectedSeat) return;
    const updated = seatData.map((row, rowIndex) =>
      row.map((seat, colIndex) => {
        if (rowIndex === selectedSeat.row && colIndex === selectedSeat.col) {
          return { ...seat, status: status as SeatStatus };
        }
        return seat;
      })
    );
    setSetData(updated);
    setShowModal(false);
    dispatch(updateRoomLayoutThunk({ roomId, layout: updated }));
  };
  const onUserSelect = (user: { $id: string; name: string }) => {
    if (!selectedSeat) return;
    const updated = seatData.map((row, rowIndex) =>
      row.map((seat, colIndex) => {
        if (rowIndex === selectedSeat.row && colIndex === selectedSeat.col) {
          return {
            ...seat,
            status: "allotted" as SeatStatus,
            userId: user.$id,
            userName: user.name,
          };
        }
        return seat;
      })
    );
    setSetData(updated);
    setShowModal(false);
    dispatch(updateRoomLayoutThunk({ roomId, layout: updated }));
  };
  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);
  if(loading) return <p className="text-center">Loading..</p>
  if (error) return <p>Error in SeatGrid</p>

  return (
    <>
      <div className="grid grid-cols-5 gap-3 mt-10">
        {seatData.map((row, rowIdx) =>
          row.map((seat, colIdx) => {
            const bg =
              seat.status === "blank"
                ? isAdmin
                  ? "bg-gray-400"
                  : ""
                : seat.status === "vacant"
                ? "bg-green-400"
                : "bg-blue-400";

            const isAdminClickable = isAdmin;
            const isUserClickable = !isAdmin && seat.status === "allotted";

            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                onClick={() => handleSeatClick(seat, rowIdx, colIdx)}
                className={`p-4 rounded shadow-2xl text-sm font-medium ${bg} ${
                  isAdminClickable || isUserClickable
                    ? "cursor-pointer hover:ring-2 ring-indigo-400"
                    : ""
                }`}
              >
                <p>{isAdmin || seat.status !== "blank" ? seat.label : ""}</p>
                <p>{seat.status !== "blank" ? seat.userName : ""}</p>
              </div>
            );
          })
        )}
      </div>

      {showModal && selectedSeat && (
        <Modal onClose={() => setShowModal(false)}>
          <>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-gray-700">
                Seat Details
              </h2>
              <p className="text-gray-700">
                <strong>Status:</strong> {selectedSeat.seat.status}
              </p>
              {selectedSeat?.seat.status === "allotted" &&
                (() => {
                  const user = users.find(
                    (u) => u.$id === selectedSeat.seat.userId
                  );
                  if (!user)
                    return <p className="text-red-500">User not found</p>;
                  return (
                    <div className="p-4 mt-4 border rounded bg-gray-100">
                      <h3 className="text-lg font-bold text-gray-700">
                        User Details
                      </h3>
                      <p className="text-gray-700">
                        <strong>Name:</strong> {user.name}
                      </p>
                      <p className="text-gray-700">
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p className="text-gray-700">
                        <strong>Position:</strong> {user.position}
                      </p>
                    </div>
                  );
                })()}
            </div>
            {isAdmin && (
              <>
                <button
                  onClick={() => {
                    updateSeatStatus("blank");
                  }}
                  className="w-full px-4 py-2 mb-2 bg-gray-600 hover:bg-gray-800 rounded text-white"
                >
                  Set to Blank
                </button>
                <button
                  onClick={() => {
                    updateSeatStatus("vacant");
                  }}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-800 rounded text-white"
                >
                  Set to Vacant
                </button>
                <UserList users={users} onUserSelect={onUserSelect} />{" "}
              </>
            )}
          </>
        </Modal>
      )}
    </>
  );
};

export default SeatGrid;
