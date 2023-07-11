import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  userName: null,
  userEmail: null,
  stateChange: false,
  userPhoto: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      userEmail: payload.userEmail,
      userPhoto: payload.userPhoto,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),

    authSingOut: () => state,
  },
});
