import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSoonEvents,
  fetchAllEvents,
  toggleFavourite,
} from "../api/eventApi";
import type { FavouriteRequest, EventFilters } from "./types";

export const fetchSoonEventsThunk = createAsyncThunk(
  "event/fetchSoon",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchSoonEvents();
      return { count: response.count, events: response.events };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch soon events",
      );
    }
  },
);

export const fetchAllEventsThunk = createAsyncThunk(
  "event/fetchAll",
  async (filters: EventFilters = {}, { rejectWithValue }) => {
    try {
      const response = await fetchAllEvents(filters);
      return response.events;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch events",
      );
    }
  },
);

export const toggleFavouriteThunk = createAsyncThunk(
  "event/toggleFavourite",
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
