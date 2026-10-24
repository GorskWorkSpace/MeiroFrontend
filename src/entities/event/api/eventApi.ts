import { baseApi } from "../../../shared/api/baseApi";
import { USE_MOCKS } from "../../../shared/config/mocks";
import { delay } from "../../../shared/lib/delay";
import { EVENTS_PAGE_SIZE, SOON_EVENTS_LIMIT } from "../model/constants";
import {
  eventMocks,
  getEventDetailMock,
  soonEventMocks,
} from "../model/eventMocks";
import type {
  EventDetail,
  EventFilters,
  EventsResponse,
  FavouriteRequest,
  FavouriteResponse,
  SoonEventsResponse,
} from "../model/types";

export const fetchFavouriteEvents = async (): Promise<EventsResponse> => {
  if (USE_MOCKS) {
    await delay(500);
    return { events: eventMocks.filter((event) => event.isFavourite) };
  }

  const { data } = await baseApi.get<EventsResponse>("/event/favourite/all");
  return data;
};

export const fetchSoonEvents = async (): Promise<SoonEventsResponse> => {
  if (USE_MOCKS) {
    await delay(600);

    const favouriteIds = new Set(
      eventMocks.filter((event) => event.isFavourite).map((event) => event.id),
    );
    const favouriteSoon = soonEventMocks.filter((e) => favouriteIds.has(e.id));
    const otherSoon = soonEventMocks.filter((e) => !favouriteIds.has(e.id));
    const events = [...favouriteSoon, ...otherSoon].slice(0, SOON_EVENTS_LIMIT);

    return { count: events.length, events };
  }

  const { data } = await baseApi.get<SoonEventsResponse>("/event/soon/all");
  return data;
};

const getMockEvents = ({ page = 0, search, category }: EventFilters) => {
  let events = [...eventMocks];

  if (search) {
    const searchLower = search.toLowerCase();
    events = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchLower) ||
        event.category.toLowerCase().includes(searchLower),
    );
  }

  if (category && category !== "Все") {
    const categories = category.split(",").map((c) => c.trim());
    events = events.filter((event) => categories.includes(event.category));
  }

  const start = page * EVENTS_PAGE_SIZE;
  return events.slice(start, start + EVENTS_PAGE_SIZE);
};

const buildEventsParams = (filters: EventFilters) => {
  const params = new URLSearchParams();

  params.append("page", String(filters.page));
  params.append("offset", String(EVENTS_PAGE_SIZE));

  if (filters.category) params.append("category", filters.category);
  if (filters.search) params.append("search", filters.search);
  if (filters.priceFrom !== undefined)
    params.append("priceFrom", String(filters.priceFrom));
  if (filters.priceTo !== undefined)
    params.append("priceTo", String(filters.priceTo));
  if (filters.countPlace) params.append("countPlace", filters.countPlace);
  if (filters.eventId) params.append("eventId", filters.eventId);

  return params;
};

export const fetchAllEvents = async (
  filters: EventFilters,
): Promise<EventsResponse> => {
  if (USE_MOCKS) {
    await delay(800);
    return { events: getMockEvents(filters) };
  }

  const { data } = await baseApi.get<EventsResponse>("/event/all", {
    params: buildEventsParams(filters),
  });
  return data;
};

export const fetchEventById = async (
  id: string,
): Promise<EventDetail | null> => {
  if (USE_MOCKS) {
    await delay(300);
    return getEventDetailMock(id);
  }

  const { data } = await baseApi.get<EventDetail>(`/event/${id}`);
  return data;
};

export const toggleFavourite = async (
  request: FavouriteRequest,
): Promise<FavouriteResponse> => {
  if (USE_MOCKS) {
    await delay(300);

    const index = eventMocks.findIndex((e) => e.id === request.id);
    if (index === -1) {
      return { id: request.id, isFavourite: false };
    }

    // Объекты моков могут быть заморожены Immer, поэтому заменяем, а не мутируем
    const isFavourite = !eventMocks[index].isFavourite;
    eventMocks[index] = { ...eventMocks[index], isFavourite };
    return { id: request.id, isFavourite };
  }

  const { data } = await baseApi.post<FavouriteResponse>(
    "/event/favourite",
    request,
  );
  return data;
};
