import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllEvents,
  fetchSoonEvents,
  toggleFavourite,
} from "../api/eventApi";
import type { EventFilters, FavouriteRequest } from "./types";

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
      return {
        events: response.events,
        page: filters.page || 0,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch events",
      );
    }
  },
);

export const fetchNextPageThunk = createAsyncThunk(
  "event/fetchNextPage",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { event: { filters: EventFilters } };
      const nextPage = (state.event.filters.page || 0) + 1;

      const response = await fetchAllEvents({
        ...state.event.filters,
        page: nextPage,
      });

      return {
        events: response.events,
        page: nextPage,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch next page",
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