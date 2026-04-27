import { createSlice } from "@reduxjs/toolkit";
import type { CategoryState } from "./types";
import { fetchAllCategories } from "./categoryThunks";

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
