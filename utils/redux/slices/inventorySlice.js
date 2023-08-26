import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matchingBooks: [],
  nonMatchingBooks: [],
  allProcessedBooks: [],
  allSpaces: [],
};

const inventorySlice = createSlice({
  name: "inventoryState",
  initialState,
  reducers: {
    setMatchingBooks: (state, action) => {
      state.matchingBooks = action.payload;
    },
    setNonMatchingBooks: (state, action) => {
      state.nonMatchingBooks = action.payload;
    },
    setAllProcessedBooks: (state, action) => {
      state.allProcessedBooks = action.payload;
    },
    setAllSpaces: (state, action) => {
      state.allSpaces = action.payload;
    },
  },
});

export const {
  setMatchingBooks,
  setNonMatchingBooks,
  setAllProcessedBooks,
  setAllSpaces,
} = inventorySlice.actions;

export default inventorySlice.reducer;
