import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice"; // ✅ case matches the filename exactly
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"


const appStore = configureStore({
  reducer: {
    user: userReducer, // state.user
    feed: feedReducer, // state.feed
    connection: connectionReducer,
    requests:requestReducer
  }
});

export default appStore;
