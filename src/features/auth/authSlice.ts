import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkSessionThunk, loginThunk, logoutThunk } from "./authThunk";

interface AuthState {
  user: { email: string } | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAdmin: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // logout(state) {
    //   (state.user = null),
    //     (state.isAdmin = false),
    //     (state.loading = false),
    //     (state.error = null);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<{ email: string }>) => {
          state.loading = false;
          state.user = action.payload;
          state.isAdmin = action.payload.email == "p@gmail.com";
          state.error = null;
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        state.isAdmin = false;
      })
      //logout
      .addCase(logoutThunk.pending,(state)=>{
        state.loading = true
        state.error = null
      })
      .addCase(logoutThunk.fulfilled,(state)=>{
        state.user = null
        state.isAdmin = false
        state.loading = false
        state.error = null
      })
      .addCase(logoutThunk.rejected,(state,action)=>{

        state.loading = false
        state.error = action.payload as string
      })
      //checksession

      .addCase(checkSessionThunk.pending,(state)=>{
        state.loading= true
        state.error = null
      })

      .addCase(checkSessionThunk.fulfilled,(state,action)=>{
        state.loading= false
        state.user = action.payload;
        state.isAdmin = action.payload.email == "p@gmail.com";
        state.error = null
      })

      .addCase(checkSessionThunk.rejected,(state,action)=>{
        state.loading= false
        state.isAdmin = false
        state.error = action.payload as string
      })
  },
});
// export const {logout} = authSlice.actions
export default authSlice.reducer
