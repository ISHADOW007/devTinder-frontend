import { createSlice } from "@reduxjs/toolkit";

// 📦 Slice to manage "feed" (e.g., list of cards shown to user)
const feedSlice = createSlice({
  name: "feed",        // 🏷️ Slice name (used in Redux DevTools)
  initialState: null,  // 📄 Initial state (no feed data initially)
  reducers: {
    // ✅ Add feed data to Redux state (e.g., when API gives feed list)
    addFeed: (state, action) => {
      return action.payload; // Usually an array of cards/posts
    },

    // ❌ Remove feed data from state (e.g., on logout or refresh)
    removeFeed: () => {
      return null;
    },
     removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
    

  }
});

// 🔁 Export action creators for use in components (e.g., dispatch(addFeed(data)))
export const { addFeed, removeFeed, removeUserFromFeed } = feedSlice.actions;

// 🚀 Export the reducer to plug into the Redux store
export default feedSlice.reducer;
