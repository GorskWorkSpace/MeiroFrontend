export interface Event {
  id: string;
  img: string | null;
  title: string;
  category: string;
  isFavourite: boolean;
  date: string;
}

export interface SoonEvent {
  id: string;
  img: string | null;
  date: string;
  address: string;
  title: string;
}

export interface EventsResponse {
  events: Event[];
}

export interface SoonEventsResponse {
  count: number;
  events: SoonEvent[];
}

export interface FavouriteRequest {
  id: string;
}

export interface FavouriteResponse {
  id: string;
  isFavourite: boolean;
}

export interface EventFilters {
  page?: number;
  offset?: number;
  category?: string;
  search?: string;
  priceFrom?: number;
  priceTo?: number;
  countPlace?: "many" | "little";
}

export interface EventState {
  allEvents: Event[];
  favouriteEvents: Event[];
  soonEvents: SoonEvent[];
  soonEventsCount: number;
  loading: boolean;
  error: string | null;
  filters: EventFilters;
}
