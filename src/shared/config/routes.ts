export const ROUTES = {
  main: "/",
  eventDetail: "/event/:eventId",
  myEvents: "/event/my-events",
  settings: "/settings",
} as const;

export const getEventDetailRoute = (eventId: string) => `/event/${eventId}`;
