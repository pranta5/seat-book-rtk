import { combineReducers } from "@reduxjs/toolkit";
import roomReducer from '@/features/rooms/roomSlice'
import authReducer from '@/features/auth/authSlice'
import userReducer from '@/features/user/userSlice'

const rootReducer = combineReducers({
    rooms:roomReducer,
    auth:authReducer,
    user:userReducer,
})
export type RootState = ReturnType <typeof rootReducer>
export default rootReducer