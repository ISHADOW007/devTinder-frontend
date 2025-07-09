// ✅ Importing the createSlice function from Redux Toolkit
// It helps in creating a slice of the Redux state with actions and reducers
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    // 🏷️ Name of this slice - used internally and in Redux DevTools
    name: 'user',

    // 📦 Initial state - null means no user is logged in initially
    initialState: null,

    // 🎯 Reducers - functions that define how state changes in response to actions
    reducers: {
        // ✅ addUser - triggered when a user logs in or registers
        // Sets the state to the user's data
        addUser: (state, action) => {
            return action.payload; // e.g., { id, name, email }
        },

        // ❌ removeUser - triggered when the user logs out
        // Resets the state to null
        removeUser: (state, action) => {
            return null;
        }
    }
});

// 🛠️ Exporting action creators for use in components (e.g., dispatch(addUser(userData)))
export const { addUser, removeUser } = userSlice.actions;

// 🚀 Exporting the reducer to add to the Redux store
export default userSlice.reducer;
