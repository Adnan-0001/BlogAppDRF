import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = { userId: null, token: null };

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access } = action.payload;
      const { user_id } = jwtDecode(access);
      state.userId = user_id;
      state.token = access;
    },
    logOut: (state, action) => {
      state.userId = null;
      state.token = null;
    },
  },
});

export const selectCurrentUserId = (state) => state.auth.userId;
export const selectCurrentToken = (state) => state.auth.token;

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
