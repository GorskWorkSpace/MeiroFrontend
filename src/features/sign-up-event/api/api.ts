import { baseApi } from "../../../shared/api/baseApi";
import type { EventRequest } from "./dto";

export const EventParticipation = async (eventRequest: EventRequest) => {
  await baseApi.post("/event/participation", eventRequest);
};
