import { createUser, deleteUser, getUsers } from "@/lib/services/userService";
import { userTs } from "@/types/user";
import {  createAsyncThunk } from "@reduxjs/toolkit";

export const createUserThunk = createAsyncThunk('user/create',async(data:userTs,thunkAPI)=>{
    try {
       const newuser =  await createUser(data.name,data.email,data.position)
       return{
        $id: newuser.$id,
        name:newuser.name,
        email:newuser.email,
        position:newuser.position
       }
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.message || " failed in create user")
    }
})

export const getUsersThunk = createAsyncThunk<userTs[],void,{rejectValue:string}>('user/get',async(_,thunkAPI)=>{
    try {
        const res = await getUsers()
        const users:userTs[] =res.map(doc=>({
            $id:doc.$id,
            name :doc.name,
            email:doc.email,
            position:doc.position
        }))
        return users
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.message || "failed while get user")
    }
})

export const deleteUserThunk = createAsyncThunk('user/delete',async(userId: string, thunkAPI)=>{
    try {
        await deleteUser(userId)
        return userId
    } catch ( error : any) {
        return thunkAPI.rejectWithValue(error.message || "failed in delete user")
    }
})