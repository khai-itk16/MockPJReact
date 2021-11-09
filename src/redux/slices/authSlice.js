import { createSlice } from "@reduxjs/toolkit";

const currentUser = localStorage.getItem("currentUser");

const initialState = {
  value: currentUser ? JSON.parse(currentUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeUserId: (state, action) => {
      state.value = action.payload;
    },
    removeUserId: (state, action) => {
      state.value = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { storeUserId, removeUserId } = authSlice.actions;
export default authSlice.reducer;
