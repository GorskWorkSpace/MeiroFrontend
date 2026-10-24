import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategories } from "../api/api";

export const fetchAllCategories = createAsyncThunk(
  "category/fetchAllCategories",
  getAllCategories,
);
