// 📶 Redux Slice: statusSlice.js (for isOnline / lastSeen)
import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {}, // userId => { isOnline, lastSeen }
  reducers: {
    updateStatus: (state, action) => {
      const { userId, isOnline, lastSeen } = action.payload;
      state[userId] = { isOnline, lastSeen };
    },
  },
});

export const { updateStatus } = statusSlice.actions;
export default statusSlice.reducer;