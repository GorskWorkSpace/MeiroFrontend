import { createAsyncThunk } from "@reduxjs/toolkit";
import { toggleFavourite } from "../../../entities/event/api/eventApi";
import type { FavouriteRequest } from "./types";

export const toggleFavouriteThunk = createAsyncThunk(
  "favourite/toggle",
  async (request: FavouriteRequest, { rejectWithValue }) => {
    try {
      const response = await toggleFavourite(request);
      return { id: response.id, isFavourite: response.isFavourite };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to toggle favourite",
      );
    }
  },
);
