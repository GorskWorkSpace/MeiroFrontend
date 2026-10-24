import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../../shared/lib/getErrorMessage";
import { fetchAdById, fetchAllAds } from "../api/adApi";

export const fetchAllAdsThunk = createAsyncThunk(
  "ad/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllAds();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch ads"));
    }
  },
);

export const fetchAdByIdThunk = createAsyncThunk(
  "ad/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const ad = await fetchAdById(id);
      return ad ?? rejectWithValue("Ad not found");
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch ad"));
    }
  },
);
