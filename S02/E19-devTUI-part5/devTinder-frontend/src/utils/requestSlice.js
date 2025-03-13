import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      //state is whole "array of objects/requests" where they were saved when we called addRequests( ie. showing how many connection requests logged in user received)
      // filtering the request we want to remove after request/review/accepted or rejected
      // that request's id is coming in action.payload
      const newArray = state.filter(
        (request) => request._id !== action.payload
      );
      // will update state with new array( removing the request user accepted or rejected)
      return newArray;
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
