import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Room} from '@/types/rooms'
import { fetchRoomsThunk,createRoomThunk,deleteRoomThunk, getRoomByIdThunk, updateRoomLayoutThunk } from "./roomThunks";
interface RoomState{
    rooms:Room[];
    loading:boolean;
    error:string | null
}

const initialState: RoomState={
    rooms:[],
    loading:false,
    error:null,
}

const roomSlice = createSlice({
    name:"rooms",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //create
        .addCase(createRoomThunk.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(createRoomThunk.fulfilled,(state,action:PayloadAction<Room>)=>{
            state.loading = false
            state.rooms.push(action.payload)
        })
        .addCase(createRoomThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload as string
        })
        //fetch
        .addCase(fetchRoomsThunk.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(fetchRoomsThunk.fulfilled, (state, action: PayloadAction<Room[]>) => {
            state.loading = false;
            state.rooms = [...action.payload]
          })    
        .addCase(fetchRoomsThunk.rejected,(state,action)=>{
            state.loading = false
            state.error=action.payload as string
        })

        //delete
        .addCase(deleteRoomThunk.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(deleteRoomThunk.fulfilled,(state,action:PayloadAction<string>)=>{
            state.loading = false
            state.rooms = state.rooms.filter((room) =>room.$id !==action.payload)
        })
        .addCase(deleteRoomThunk.rejected,(state,action)=>{
            state.loading = false
            state.error=action.payload as string
        })
        // RoomById
        .addCase(getRoomByIdThunk.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(getRoomByIdThunk.fulfilled,(state,action)=>{
            state.loading = false,
            state.rooms = [action.payload]
            state.error = null
        })
        .addCase(getRoomByIdThunk.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload as string
        })
        //update layout
        .addCase(updateRoomLayoutThunk.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(updateRoomLayoutThunk.fulfilled,(state,action)=>{
            const {roomId,layout} = action.payload
            const room = state.rooms.find((r)=>r.$id ===roomId)
            if(room){
                room.layout = layout
            }
            state.loading = false
        })
        .addCase(updateRoomLayoutThunk.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload as string
        })
    }

}) 

export default roomSlice.reducer;