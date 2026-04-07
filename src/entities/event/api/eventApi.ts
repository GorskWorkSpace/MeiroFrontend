import { baseApi } from "../../../shared/api/baseApi";
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

const USE_MOCKS = false;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchFavouriteEvents = async () => {
  const { data } = await baseApi.get<EventsResponse>("/event/favourite/all");

  return data;
};

export const fetchSoonEvents = async (): Promise<SoonEventsResponse> => {
  if (USE_MOCKS) {
    await delay(600);

    const favouriteEventIds = eventMocks
      .filter((event) => event.isFavourite)
      .map((event) => event.id);

    const favouriteSoonEvents = soonEventMocks.filter((event) =>
      favouriteEventIds.includes(event.id),
    );

    let resultEvents = [...favouriteSoonEvents];

    if (resultEvents.length < 5) {
      const otherEvents = soonEventMocks
        .filter((event) => !favouriteEventIds.includes(event.id))
        .slice(0, 5 - resultEvents.length);

      resultEvents = [...resultEvents, ...otherEvents];
    }

    return {
      count: resultEvents.length,
      events: resultEvents.slice(0, 5),
    };
  }

  const { data } = await baseApi.get<SoonEventsResponse>("/event/soon/all");
  return data;
};

export const fetchAllEvents = async (
  filters: EventFilters,
): Promise<EventsResponse> => {
  if (USE_MOCKS) {
    await delay(2500);

    const page = filters.page || 0;
    const offset = 12;

    let filteredEvents = [...eventMocks];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.category.toLowerCase().includes(searchLower),
      );
    }
    if (filters.category) {
      const categories = filters.category.split(",").map((c) => c.trim());
      filteredEvents = filteredEvents.filter((event) =>
        categories.includes(event.category),
      );
    }

    const start = page * offset;
    const end = start + offset;

    return {
      events: filteredEvents.slice(start, end),
    };
  }

  const params = new URLSearchParams();

  if (filters.page !== undefined) {
    params.append("page", filters.page.toString());
  }
  params.append("offset", "12");

  if (filters.category) params.append("category", filters.category);
  if (filters.search) params.append("search", filters.search);
  if (filters.priceFrom !== undefined)
    params.append("priceFrom", filters.priceFrom.toString());
  if (filters.priceTo !== undefined)
    params.append("priceTo", filters.priceTo.toString());
  if (filters.countPlace) params.append("countPlace", filters.countPlace);
  if (filters.eventId) params.append("eventId", filters.eventId);

  const { data } = await baseApi.get<EventsResponse>("/event/all", { params });
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

    const eventIndex = eventMocks.findIndex((e) => e.id === request.id);
    if (eventIndex !== -1) {
      const newStatus = !eventMocks[eventIndex].isFavourite;

      eventMocks[eventIndex] = {
        ...eventMocks[eventIndex],
        isFavourite: newStatus,
      };

      return {
        id: request.id,
        isFavourite: newStatus,
      };
    }

    return {
      id: request.id,
      isFavourite: false,
    };
  }

  const { data } = await baseApi.post<FavouriteResponse>(
    "/event/favourite",
    request,
  );
  return data;
};
