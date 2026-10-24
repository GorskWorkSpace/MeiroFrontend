import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { EVENTS_PAGE_SIZE } from "./constants";
import {
  fetchAllEventsThunk,
  fetchEventByIdThunk,
  fetchFavouriteEventsThunk,
  fetchNextPageThunk,
  fetchSoonEventsThunk,
  toggleFavouriteThunk,
} from "./eventThunks";
import type { Event, EventFilters, EventState, SoonEvent } from "./types";

const initialFilters: EventFilters = {
  page: 0,
  offset: EVENTS_PAGE_SIZE,
  category: undefined,
  search: undefined,
  priceFrom: undefined,
  priceTo: undefined,
  countPlace: undefined,
};

const initialState: EventState = {
  allEvents: [],
  soonEvents: [],
  soonEventsCount: 0,
  eventDetail: null,
  loading: false,
  loadingMore: false,
  soonLoading: false,
  detailLoading: true,
  error: null,
  hasMore: true,
  filters: initialFilters,
};

const toSoonEvent = (event: Event, address?: string): SoonEvent => ({
  id: event.id,
  img: event.img,
  date: event.date,
  title: event.title,
  address: address || "Адрес не указан",
});

// Применяет статус избранного к событию в списке и к открытому событию
const setFavourite = (
  state: EventState,
  id: string,
  getValue: (current: boolean) => boolean,
) => {
  const event = state.allEvents.find((e) => e.id === id);
  if (event) {
    event.isFavourite = getValue(event.isFavourite);
  }

  if (state.eventDetail?.id === id) {
    state.eventDetail.isFavourite = getValue(!!state.eventDetail.isFavourite);
  }

  return event;
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearEventDetail: (state) => {
      state.eventDetail = null;
      state.detailLoading = true;
    },
    setFilters: (state, action: PayloadAction<Partial<EventFilters>>) => {
      state.filters = { ...state.filters, ...action.payload, page: 0 };
    },
    resetFilters: (state) => {
      state.filters = initialFilters;
      state.allEvents = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEventsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEventsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allEvents = action.payload.events;
        state.filters.page = action.meta.arg.page;
        state.hasMore = action.payload.events.length === EVENTS_PAGE_SIZE;
      })
      .addCase(fetchAllEventsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.allEvents = [];
      })

      .addCase(fetchFavouriteEventsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavouriteEventsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allEvents = action.payload.events;
      })
      .addCase(fetchFavouriteEventsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.allEvents = [];
      })

      .addCase(fetchNextPageThunk.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(fetchNextPageThunk.fulfilled, (state, action) => {
        state.loadingMore = false;
        state.allEvents.push(...action.payload.events);
        state.filters.page = action.payload.page;
        state.hasMore = action.payload.events.length === EVENTS_PAGE_SIZE;
      })
      .addCase(fetchNextPageThunk.rejected, (state, action) => {
        state.loadingMore = false;
        state.error = action.payload as string;
      })

      .addCase(fetchSoonEventsThunk.pending, (state) => {
        state.soonLoading = true;
        state.error = null;
      })
      .addCase(fetchSoonEventsThunk.fulfilled, (state, action) => {
        state.soonLoading = false;
        state.soonEvents = action.payload.events;
        state.soonEventsCount = action.payload.count;
      })
      .addCase(fetchSoonEventsThunk.rejected, (state, action) => {
        state.soonLoading = false;
        state.error = action.payload as string;
        state.soonEvents = [];
        state.soonEventsCount = 0;
      })

      .addCase(fetchEventByIdThunk.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
        state.eventDetail = null;
      })
      .addCase(fetchEventByIdThunk.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.eventDetail = action.payload;
      })
      .addCase(fetchEventByIdThunk.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload as string;
        state.eventDetail = null;
      })

      // Оптимистичное обновление: переключаем сразу, откатываем при ошибке
      .addCase(toggleFavouriteThunk.pending, (state, action) => {
        setFavourite(state, action.meta.arg.id, (current) => !current);
      })
      .addCase(toggleFavouriteThunk.fulfilled, (state, action) => {
        const { id, isFavourite } = action.payload;
        const event = setFavourite(state, id, () => isFavourite);

        if (!isFavourite) {
          state.soonEvents = state.soonEvents.filter((e) => e.id !== id);
        } else if (event && !state.soonEvents.some((e) => e.id === id)) {
          state.soonEvents.push(toSoonEvent(event));
        }
        state.soonEventsCount = state.soonEvents.length;
      })
      .addCase(toggleFavouriteThunk.rejected, (state, action) => {
        setFavourite(state, action.meta.arg.id, (current) => !current);
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearEventDetail, setFilters, resetFilters } =
  eventSlice.actions;

export const eventReducer = eventSlice.reducer;
