import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchAllAdsThunk, fetchAdByIdThunk } from "./adThunks";
import type { AdState, Ad } from "./types";

const initialState: AdState = {
  ads: [],
  currentAd: null,
  loading: false,
  error: null,
};

export const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    clearCurrentAd: (state) => {
      state.currentAd = null;
    },
    clearAds: (state) => {
      state.ads = [];
      state.error = null;
    },
    removeAd: (state, action: PayloadAction<string>) => {
      state.ads = state.ads.filter(ad => ad.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAdsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAdsThunk.fulfilled, (state, action: PayloadAction<Ad[]>) => {
        state.loading = false;
        state.ads = action.payload;
      })
      .addCase(fetchAllAdsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.ads = [];
      })
      .addCase(fetchAdByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdByIdThunk.fulfilled, (state, action: PayloadAction<Ad>) => {
        state.loading = false;
        state.currentAd = action.payload;
      })
      .addCase(fetchAdByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentAd = null;
      });
  },
});

export const { clearCurrentAd, clearAds, removeAd } = adSlice.actions;
export default adSlice.reducer;