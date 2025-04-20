import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRooms,
  createRoom as createRoomService,
  deleteRoom as deleteRoomService,
  getRoomById,
  updateRoomLayout,
} from "@/lib/services/roomServices";
import { Room, Seat } from "@/types/rooms";

export const createRoomThunk = createAsyncThunk<
  Room,
  { name: string; layout: Seat[][] },
  { rejectValue: string }
>("rooms/create", async (roomData, thunkAPI) => {
  try {
    const newRoom = await createRoomService(roomData.name, roomData.layout);
    return newRoom;
  } catch (err) {
    const error = err as Error;
    return thunkAPI.rejectWithValue(error.message || "failed");
  }
});

export const fetchRoomsThunk = createAsyncThunk<
  Room[],
  void,
  { rejectValue: string }
>("rooms/fetchAll", async (_, thunkAPI) => {
  try {
    const rooms = await getRooms();
    return rooms;
  } catch (err) {
    const error = err as Error;
    return thunkAPI.rejectWithValue(error.message || "error in fetch room");
  }
});

export const deleteRoomThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("room/delete", async (roomId, thunkAPI) => {
  try {
    await deleteRoomService(roomId);
    return roomId;
  } catch (err) {
    const error = err as Error;
    return thunkAPI.rejectWithValue(error.message || " failed");
  }
});

export const getRoomByIdThunk = createAsyncThunk(
  "room/roomById",
  async (roomId: string, thunkAPI) => {
    try {
      const room = await getRoomById(roomId);
      return room;
    } catch (err) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(error.message || "failed in byid");
    }
  }
);

export const updateRoomLayoutThunk = createAsyncThunk(
  "room/updateLayout",
  async (
    { roomId, layout }: { roomId: string; layout: Seat[][] },
    thunkAPI
  ) => {
    try {
      const res = await updateRoomLayout(roomId, layout);
      return {
        roomId,
        layout: JSON.parse(res.layout),
      };
    } catch (err) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(
        error.message || "failed to update layout"
      );
    }
  }
);
