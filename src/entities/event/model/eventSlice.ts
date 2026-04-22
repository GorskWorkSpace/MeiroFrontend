import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllEventsFavouriteThunk,
  fetchAllEventsThunk,
  fetchEventByIdThunk,
  fetchNextPageThunk,
  fetchSoonEventsThunk,
  toggleFavouriteThunk,
} from "./eventThunks";
import type {
  Event,
  EventDetail,
  EventFilters,
  EventState,
  SoonEvent,
} from "./types";

const initialState: EventState = {
  allEvents: [],
  favouriteEvents: [],
  soonEvents: [],
  soonEventsCount: 0,
  eventDetail: null,
  isLoading: false,
  loading: false,
  loadingMore: false,
  error: null,
  hasMore: true,
  filters: {
    page: 0,
    offset: 12,
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
    clearEventDetail: (state) => {
      state.eventDetail = null;
    },
    setFilters: (state, action: PayloadAction<Partial<EventFilters>>) => {
      console.log(action.payload);
      state.filters = {
        ...state.filters,
        ...action.payload,
        page: 0,
      };
    },
    resetFilters: (state) => {
      state.filters = {
        page: 0,
        offset: 12,
        category: undefined,
        search: undefined,
        priceFrom: undefined,
        priceTo: undefined,
        countPlace: undefined,
      };
      state.allEvents = [];
      state.hasMore = true;
    },
    resetEvents: (state) => {
      state.allEvents = [];
      state.filters.page = 0;
      state.hasMore = true;
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
        (state, action: PayloadAction<{ events: Event[] }>) => {
          state.loading = false;
          state.allEvents = action.payload.events;
          state.hasMore = action.payload.events.length === 12;
          state.favouriteEvents = state.allEvents.filter(
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

      .addCase(fetchAllEventsFavouriteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEventsFavouriteThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.allEvents = action.payload.events;
        state.favouriteEvents = state.allEvents.filter(
          (event) => event.isFavourite,
        );
      })
      .addCase(fetchAllEventsFavouriteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.allEvents = [];
        state.favouriteEvents = [];
      })

      .addCase(fetchNextPageThunk.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(
        fetchNextPageThunk.fulfilled,
        (state, action: PayloadAction<{ events: Event[]; page: number }>) => {
          state.loadingMore = false;
          state.allEvents = [...state.allEvents, ...action.payload.events];
          state.hasMore = action.payload.events.length === 12;
          state.favouriteEvents = state.allEvents.filter(
            (event) => event.isFavourite,
          );
        },
      )
      .addCase(fetchNextPageThunk.rejected, (state, action) => {
        state.loadingMore = false;
        state.error = action.payload as string;
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

      .addCase(fetchEventByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.eventDetail = {} as EventDetail;
      })
      .addCase(
        fetchEventByIdThunk.fulfilled,
        (state, action: PayloadAction<EventDetail>) => {
          state.isLoading = false;
          state.eventDetail = action.payload;
        },
      )
      .addCase(fetchEventByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.eventDetail = null;
      })

      .addCase(toggleFavouriteThunk.pending, (state, action) => {
        const eventId = action.meta.arg.id;
        const event = state.allEvents.find((e) => e.id === eventId);
        const eventDetail = state.eventDetail;

        if (eventDetail) {
          eventDetail.isFavourite = !eventDetail.isFavourite;
        }

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

export const {
  clearError,
  clearEventDetail,
  setFilters,
  resetFilters,
  resetEvents,
} = eventSlice.actions;

export const selectAllEvents = (state: { event: EventState }) =>
  state.event.allEvents;
export const selectFavouriteEvents = (state: { event: EventState }) =>
  state.event.favouriteEvents;
export const selectSoonEvents = (state: { event: EventState }) =>
  state.event.soonEvents;
export const selectSoonEventsCount = (state: { event: EventState }) =>
  state.event.soonEventsCount;
export const selectEventDetail = (
  state: { event: EventState }, // Добавлен селектор
) => state.event.eventDetail;
export const selectEventsLoading = (state: { event: EventState }) =>
  state.event.loading;
export const selectEventsLoadingMore = (state: { event: EventState }) =>
  state.event.loadingMore;
export const selectEventsError = (state: { event: EventState }) =>
  state.event.error;
export const selectEventFilters = (state: { event: EventState }) =>
  state.event.filters;
export const selectFavouriteCount = (state: { event: EventState }) =>
  state.event.favouriteEvents.length;
export const selectHasMoreEvents = (state: { event: EventState }) =>
  state.event.hasMore;
export const selectIsLoading = (state: { event: EventState }) =>
  state.event.isLoading;

export default eventSlice.reducer;
