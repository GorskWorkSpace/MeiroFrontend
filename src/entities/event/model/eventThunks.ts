import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../../shared/lib/getErrorMessage";
import {
  fetchAllEvents,
  fetchEventById,
  fetchFavouriteEvents,
  fetchSoonEvents,
  toggleFavourite,
} from "../api/eventApi";
import type { EventFilters, EventState, FavouriteRequest } from "./types";

export const fetchSoonEventsThunk = createAsyncThunk(
  "event/fetchSoon",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSoonEvents();
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch soon events"),
      );
    }
  },
);

export const fetchAllEventsThunk = createAsyncThunk(
  "event/fetchAll",
  async (filters: EventFilters, { rejectWithValue }) => {
    try {
      return await fetchAllEvents(filters);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch events"));
    }
  },
);

export const fetchFavouriteEventsThunk = createAsyncThunk(
  "event/fetchFavourite",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchFavouriteEvents();
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch favourite events"),
      );
    }
  },
);

export const fetchNextPageThunk = createAsyncThunk(
  "event/fetchNextPage",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = (getState() as { event: EventState }).event;
      const nextPage = filters.page + 1;
      const { events } = await fetchAllEvents({ ...filters, page: nextPage });

      return { events, page: nextPage };
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch next page"),
      );
    }
  },
);

export const fetchEventByIdThunk = createAsyncThunk(
  "event/fetchEventById",
  async (id: string, { rejectWithValue }) => {
    try {
      const event = await fetchEventById(id);
      return event ?? rejectWithValue("Event not found");
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch event"));
    }
  },
);

export const toggleFavouriteThunk = createAsyncThunk(
  "event/toggleFavourite",
  async (request: FavouriteRequest, { rejectWithValue }) => {
    try {
      return await toggleFavourite(request);
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to toggle favourite"),
      );
    }
  },
);
