import { createSlice, type PayloadAction, createSelector } from "@reduxjs/toolkit";
import {
  fetchAllEventsThunk,
  fetchNextPageThunk,
  fetchSoonEventsThunk,
  toggleFavouriteThunk,
} from "./eventThunks";
import type { Event, EventFilters, EventState, SoonEvent } from "./types";

const initialState: EventState = {
  allEvents: [],
  favouriteEvents: [],
  soonEvents: [],
  soonEventsCount: 0,
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
    date: undefined,
  },
  tempFilters: {
    category: undefined,
    priceFrom: undefined,
    priceTo: undefined,
    countPlace: undefined,
    date: undefined,
  },
  isOpen: {
    date: false,
    categories: false,
    price: false,
    countPlace: false,
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
      state.filters = { ...state.filters, ...action.payload, page: 0 };
      state.allEvents = [];
      state.hasMore = true;
    },

    setSearch: (state, action: PayloadAction<string | undefined>) => {
      state.filters.search = action.payload;
      state.filters.page = 0;
      state.allEvents = [];
      state.hasMore = true;
      state.loading = true;
    },

    setTempDate: (state, action: PayloadAction<string | undefined>) => {
      state.tempFilters.date = action.payload;
      if (action.payload) {
        state.isOpen.date = true;
      }
    },
    setTempCategory: (state, action: PayloadAction<string | undefined>) => {
      state.tempFilters.category = action.payload;
      if (action.payload) {
        state.isOpen.categories = true;
      }
    },
    setTempPriceFrom: (state, action: PayloadAction<number | undefined>) => {
      state.tempFilters.priceFrom = action.payload;
      if (action.payload !== undefined) {
        state.isOpen.price = true;
      }
    },
    setTempPriceTo: (state, action: PayloadAction<number | undefined>) => {
      state.tempFilters.priceTo = action.payload;
      if (action.payload !== undefined) {
        state.isOpen.price = true;
      }
    },
    setTempCountPlace: (state, action: PayloadAction<"many" | "little" | undefined>) => {
      state.tempFilters.countPlace = action.payload;
      if (action.payload) {
        state.isOpen.countPlace = true;
      }
    },
    
    resetTempFilters: (state) => {
      state.tempFilters = {
        category: undefined,
        priceFrom: undefined,
        priceTo: undefined,
        countPlace: undefined,
        date: undefined,
      };
    },
    
    applyTempFilters: (state) => {
      const { category, priceFrom, priceTo, countPlace, date } = state.tempFilters;
      state.filters = {
        ...state.filters,
        page: 0,
        category,
        priceFrom,
        priceTo,
        countPlace,
        date,
      };
      state.allEvents = [];
      state.hasMore = true;
      state.loading = true;
    },
    
    resetAllFilters: (state) => {
      state.filters = {
        page: 0,
        offset: 12,
        category: undefined,
        search: undefined,
        priceFrom: undefined,
        priceTo: undefined,
        countPlace: undefined,
        date: undefined,
      };
      state.tempFilters = {
        category: undefined,
        priceFrom: undefined,
        priceTo: undefined,
        countPlace: undefined,
        date: undefined,
      };
      state.allEvents = [];
      state.hasMore = true;
      state.loading = true;
      
      state.isOpen = {
        date: false,
        categories: false,
        price: false,
        countPlace: false,
      };
    },
    
    toggleFilterOpen: (state, action: PayloadAction<keyof typeof initialState.isOpen>) => {
      state.isOpen[action.payload] = !state.isOpen[action.payload];
    },
    closeAllFilters: (state) => {
      state.isOpen = {
        date: false,
        categories: false,
        price: false,
        countPlace: false,
      };
    },
    
    // Сброс событий
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
        (state, action: PayloadAction<{ events: Event[]; page: number }>) => {
          state.loading = false;
          state.allEvents = action.payload.events;
          state.filters.page = action.payload.page;
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

      .addCase(fetchNextPageThunk.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(
        fetchNextPageThunk.fulfilled,
        (state, action: PayloadAction<{ events: Event[]; page: number }>) => {
          state.loadingMore = false;
          state.allEvents = [...state.allEvents, ...action.payload.events];
          state.filters.page = action.payload.page;
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
              state.soonEvents = [...state.soonEvents, convertToSoonEvent(eventInAll)];
              state.soonEventsCount = state.soonEvents.length;
            }
          } else {
            if (state.soonEvents.some((e) => e.id === id)) {
              state.soonEvents = state.soonEvents.filter((e) => e.id !== id);
              state.soonEventsCount = state.soonEvents.length;
            }
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
  setFilters,
  setSearch,
  setTempDate,
  setTempCategory,
  setTempPriceFrom,
  setTempPriceTo,
  setTempCountPlace,
  resetTempFilters,
  applyTempFilters,
  resetAllFilters,
  toggleFilterOpen,
  closeAllFilters,
  resetEvents,
} = eventSlice.actions;

const selectEventSlice = (state: { event: EventState }) => state.event;

export const selectAllEvents = createSelector(
  [selectEventSlice],
  (event) => event.allEvents
);

export const selectFavouriteEvents = createSelector(
  [selectEventSlice],
  (event) => event.favouriteEvents
);

export const selectSoonEvents = createSelector(
  [selectEventSlice],
  (event) => event.soonEvents
);

export const selectSoonEventsCount = createSelector(
  [selectEventSlice],
  (event) => event.soonEventsCount
);

export const selectEventsLoading = createSelector(
  [selectEventSlice],
  (event) => event.loading
);

export const selectEventsLoadingMore = createSelector(
  [selectEventSlice],
  (event) => event.loadingMore
);

export const selectEventsError = createSelector(
  [selectEventSlice],
  (event) => event.error
);

export const selectEventFilters = createSelector(
  [selectEventSlice],
  (event) => event.filters
);

export const selectTempFilters = createSelector(
  [selectEventSlice],
  (event) => event.tempFilters
);

export const selectFiltersOpen = createSelector(
  [selectEventSlice],
  (event) => event.isOpen
);

export const selectFavouriteCount = createSelector(
  [selectEventSlice],
  (event) => event.favouriteEvents.length
);

export const selectHasMoreEvents = createSelector(
  [selectEventSlice],
  (event) => event.hasMore
);

export default eventSlice.reducer;