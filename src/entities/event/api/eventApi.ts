import { baseApi } from "../../../shared/api/baseApi";
import type {
  SoonEventsResponse,
  EventsResponse,
  FavouriteRequest,
  FavouriteResponse,
  EventFilters,
} from "../model/types";
import { eventMocks, soonEventMocks } from "../model/eventMocks";

const USE_MOCKS = true;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchSoonEvents = async (): Promise<SoonEventsResponse> => {
  if (USE_MOCKS) {
    await delay(600);
    return {
      count: soonEventMocks.length,
      events: soonEventMocks,
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

    const page = filters.page || 0;
    const offset = filters.offset || 10;
    const start = page * offset;
    const end = start + offset;

    return {
      events: filteredEvents.slice(start, end),
    };
  }

  const params = new URLSearchParams();
  if (filters.page !== undefined)
    params.append("page", filters.page.toString());
  if (filters.offset !== undefined)
    params.append("offset", filters.offset.toString());
  if (filters.category) params.append("category", filters.category);
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
