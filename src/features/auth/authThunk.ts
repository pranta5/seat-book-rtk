import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkSessionService,
  loginService,
  logoutService,
} from "@/lib/services/authService";

export const loginThunk = createAsyncThunk<
  { email: string },
  { email: string; password: string }
>("auth/login", async (formData, thunkAPI) => {
  try {
    const session = await loginService(formData.email, formData.password);
    return { email: session?.email || "" };
  } catch (err ) {
    const error = err as Error;
    return thunkAPI.rejectWithValue(error.message || "error in login");
  }
});

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await logoutService();
    } catch (err ) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(error.message || "logout failed");
    }
  }
);

export const checkSessionThunk = createAsyncThunk(
  "auth/checksession",
  async (_, thunkAPI) => {
    try {
      const user = await checkSessionService();
      return user;
    } catch (err ) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(error.message || "failed");
    }
  }
);
