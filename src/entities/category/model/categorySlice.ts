import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCategories } from "./categoryThunks";
import type { CategoryState } from "./types";

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

export const selectCategories = (state: { category: CategoryState }) =>
  state.category.categories;

export const categoryReducer = categorySlice.reducer;
