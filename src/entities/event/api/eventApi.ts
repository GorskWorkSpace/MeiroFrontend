import { baseApi } from "../../../shared/api/baseApi";
import { eventMocks, soonEventMocks } from "../model/eventMocks";
import type {
  EventFilters,
  EventsResponse,
  FavouriteRequest,
  FavouriteResponse,
  SoonEventsResponse,
} from "../model/types";

const USE_MOCKS = true;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
    await delay(800);

    let filteredEvents = [...eventMocks];

    if (filters.category) {
      const categories = filters.category.split(",").map((c) => c.trim());
      filteredEvents = filteredEvents.filter((event) =>
        categories.includes(event.category),
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.category.toLowerCase().includes(searchLower),
      );
    }

    if (filters.priceFrom !== undefined) {
    }
    if (filters.priceTo !== undefined) {
    }

    if (filters.countPlace) {
    }

    const page = filters.page || 0;
    const offset = filters.offset || 12;
    const start = page * offset;
    const end = start + offset;

    return {
      events: filteredEvents.slice(start, end),
    };
  }

  const params = new URLSearchParams();
  params.append("page", (filters.page || 0).toString());
  params.append("offset", (filters.offset || 12).toString());

  if (filters.category) params.append("categories", filters.category);
  if (filters.search) params.append("search", filters.search);
  if (filters.priceFrom !== undefined)
    params.append("priceFrom", filters.priceFrom.toString());
  if (filters.priceTo !== undefined)
    params.append("priceTo", filters.priceTo.toString());
  if (filters.countPlace) params.append("countPlace", filters.countPlace);

  const { data } = await baseApi.get<EventsResponse>("/event/all", { params });
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
