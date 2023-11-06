import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = { userId: null, accessToken: null, refreshToken: null };

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh } = action.payload;
      const { user_id } = jwtDecode(access);
      state.userId = user_id;
      state.accessToken = access;
      state.refreshToken = refresh;
      localStorage.setItem("authTokens", JSON.stringify(action.payload));
    },
    clearCredentials: (state, action) => {
      state.userId = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("authTokens");
    },
  },
});

export const selectCurrentUserId = (state) => state.auth.userId;
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectCurrentRefreshToken = (state) => state.auth.refreshToken;

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
