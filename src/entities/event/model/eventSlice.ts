import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllEventsThunk,
  fetchSoonEventsThunk,
  toggleFavouriteThunk,
} from "./eventThunks";
import type { EventState, Event, SoonEvent, EventFilters } from "./types";

const initialState: EventState = {
  allEvents: [],
  favouriteEvents: [],
  soonEvents: [],
  soonEventsCount: 0,
  loading: false,
  error: null,
  filters: {
    page: 0,
    offset: 10,
    category: undefined,
    search: undefined,
    priceFrom: undefined,
    priceTo: undefined,
    countPlace: undefined,
  },
};

const convertToSoonEvent = (event: Event, address?: string): SoonEvent => ({
  id: event.id,
  img: event.img,
  date: event.date,
  title: event.title,
  address: address || "Адрес не указан",
});

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<EventFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        page: 0,
        offset: 10,
        category: undefined,
        search: undefined,
        priceFrom: undefined,
        priceTo: undefined,
        countPlace: undefined,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEventsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllEventsThunk.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.loading = false;
          state.allEvents = action.payload;
          state.favouriteEvents = action.payload.filter(
            (event) => event.isFavourite,
          );
        },
      )
      .addCase(fetchAllEventsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.allEvents = [];
        state.favouriteEvents = [];
      })

      .addCase(fetchSoonEventsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSoonEventsThunk.fulfilled,
        (
          state,
          action: PayloadAction<{ count: number; events: SoonEvent[] }>,
        ) => {
          state.loading = false;
          state.soonEvents = action.payload.events;
          state.soonEventsCount = action.payload.count;
        },
      )
      .addCase(fetchSoonEventsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.soonEvents = [];
        state.soonEventsCount = 0;
      })

      .addCase(toggleFavouriteThunk.pending, (state, action) => {
        const eventId = action.meta.arg.id;
        const event = state.allEvents.find((e) => e.id === eventId);
        if (event) {
          event.isFavourite = !event.isFavourite;
        }
      })
      .addCase(
        toggleFavouriteThunk.fulfilled,
        (
          state,
          action: PayloadAction<{ id: string; isFavourite: boolean }>,
        ) => {
          const { id, isFavourite } = action.payload;

          const eventInAll = state.allEvents.find((e) => e.id === id);
          if (eventInAll) {
            eventInAll.isFavourite = isFavourite;
          }

          state.favouriteEvents = state.allEvents.filter((e) => e.isFavourite);

          if (isFavourite) {
            if (eventInAll && !state.soonEvents.some((e) => e.id === id)) {
              state.soonEvents.push(convertToSoonEvent(eventInAll));
              state.soonEventsCount = state.soonEvents.length;
            }
          } else {
            state.soonEvents = state.soonEvents.filter((e) => e.id !== id);
            state.soonEventsCount = state.soonEvents.length;
          }
        },
      )
      .addCase(toggleFavouriteThunk.rejected, (state, action) => {
        const eventId = action.meta.arg.id;
        const event = state.allEvents.find((e) => e.id === eventId);
        if (event) {
          event.isFavourite = !event.isFavourite;
        }

        state.favouriteEvents = state.allEvents.filter((e) => e.isFavourite);
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setFilters, resetFilters } = eventSlice.actions;

export const selectAllEvents = (state: { event: EventState }) =>
  state.event.allEvents;
export const selectFavouriteEvents = (state: { event: EventState }) =>
  state.event.favouriteEvents;
export const selectSoonEvents = (state: { event: EventState }) =>
  state.event.soonEvents;
export const selectSoonEventsCount = (state: { event: EventState }) =>
  state.event.soonEventsCount;
export const selectEventsLoading = (state: { event: EventState }) =>
  state.event.loading;
export const selectEventsError = (state: { event: EventState }) =>
  state.event.error;
export const selectEventFilters = (state: { event: EventState }) =>
  state.event.filters;
export const selectFavouriteCount = (state: { event: EventState }) =>
  state.event.favouriteEvents.length;

export default eventSlice.reducer;
