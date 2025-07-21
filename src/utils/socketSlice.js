// utils/socketSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createSocketConnection, disconnectSocketInstance } from "./socketManajer";



const socketSlice = createSlice({
  name: "socket",
  initialState: {
    instance: null,
    connected: false,
  },
  reducers: {
    connectSocket: (state, action) => {
      const socket = createSocketConnection(action.payload);
      console.log("1",socket)
      state.instance = socket;
      state.connected = true;
    },
    disconnectSocket: (state) => {
      disconnectSocketInstance();
      state.instance = null;
      state.connected = false;
    },
  },
});

export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
