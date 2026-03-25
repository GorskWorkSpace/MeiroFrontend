import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAdById, fetchAllAds } from "../api/adApi";

export const fetchAllAdsThunk = createAsyncThunk(
  "ad/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllAds();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch ads",
      );
    }
  },
);

export const fetchAdByIdThunk = createAsyncThunk(
  "ad/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const ad = await fetchAdById(id);
      if (!ad) {
        return rejectWithValue("Ad not found");
      }
      return ad;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch ad",
      );
    }
  },
);
