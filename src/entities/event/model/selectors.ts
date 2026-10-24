import type { EventState } from "./types";

type StateWithEvent = { event: EventState };

export const selectAllEvents = (state: StateWithEvent) =>
  state.event.allEvents;
export const selectSoonEvents = (state: StateWithEvent) =>
  state.event.soonEvents;
export const selectSoonEventsCount = (state: StateWithEvent) =>
  state.event.soonEventsCount;
export const selectSoonEventsLoading = (state: StateWithEvent) =>
  state.event.soonLoading;
export const selectEventDetail = (state: StateWithEvent) =>
  state.event.eventDetail;
export const selectEventDetailLoading = (state: StateWithEvent) =>
  state.event.detailLoading;
export const selectEventsLoading = (state: StateWithEvent) =>
  state.event.loading;
export const selectEventsLoadingMore = (state: StateWithEvent) =>
  state.event.loadingMore;
export const selectEventsError = (state: StateWithEvent) => state.event.error;
export const selectEventFilters = (state: StateWithEvent) =>
  state.event.filters;
export const selectHasMoreEvents = (state: StateWithEvent) =>
  state.event.hasMore;
