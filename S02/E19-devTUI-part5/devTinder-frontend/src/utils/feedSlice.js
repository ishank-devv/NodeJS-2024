import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      // state is basically pointing to feed in redux store,
      //  and it's having for eg: 4 user ie. in form of array of objects
      // after removeUserFromFeed is done executing, it will have 3 and instantly dispay on UI
      // filtering the user from feed we want to remove after request/send/interested or ignored( 1st swipe happened)
      // action.payload is the _id( of user on feed who got swipe 1st right/left ) which we will be sending using dispatch
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
