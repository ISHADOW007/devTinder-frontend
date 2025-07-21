import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice"; // ✅ case matches the filename exactly
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"
import socketReducer from "./socketSlice"
import statusReducer from "./statusSlice"


const appStore = configureStore({
  reducer: {
    user: userReducer, // state.user
    feed: feedReducer, // state.feed
    connection: connectionReducer,
    requests:requestReducer,
    socket: socketReducer,
    status: statusReducer,
  },


   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore socket.instance non-serializable field
        ignoredPaths: ["socket.instance"],
        ignoredActions: ["socket/connectSocket"],
      },
    }),
});




  


export default appStore;
