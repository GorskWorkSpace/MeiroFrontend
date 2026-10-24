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
  page: number;
  offset: number;
  category?: string;
  search?: string;
  priceFrom?: number;
  priceTo?: number;
  countPlace?: "many" | "little";
  eventId?: string;
}

export interface EventDetail {
  id: string;
  imgs?: string[];
  category: string;
  title: string;
  description?: string;
  startDate?: string;
  finishRegDate?: string;
  price?: number;
  countPlace?: number;
  countPlaceAll?: number;
  address?: string;
  addressUrl?: string;
  organisation?: Record<string, unknown>;
  participantsImg?: string[];
  urlEvent?: string;
  isFavourite?: boolean;
}

export interface EventState {
  allEvents: Event[];
  soonEvents: SoonEvent[];
  soonEventsCount: number;
  eventDetail: EventDetail | null;
  /** Первая страница списка событий */
  loading: boolean;
  /** Следующие страницы списка событий */
  loadingMore: boolean;
  soonLoading: boolean;
  detailLoading: boolean;
  error: string | null;
  hasMore: boolean;
  filters: EventFilters;
}
