import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
    setBasicInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setProfessionalLink: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    skills: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    interests: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    lookingFor: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// ✅ Exporting actions and reducer
export const {
  addUser,
  removeUser,
  setBasicInfo,
  setProfessionalLink,
  interests,
  skills,
  lookingFor,
} = userSlice.actions;

export default userSlice.reducer;
