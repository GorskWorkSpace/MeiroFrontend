import { baseApi } from "../../../shared/api/baseApi";
import { USE_MOCKS } from "../../../shared/config/mocks";
import { delay } from "../../../shared/lib/delay";
import type { EventRequest } from "./dto";

export const participateInEvent = async (eventRequest: EventRequest) => {
  if (USE_MOCKS) {
    await delay(300);
    return;
  }

  await baseApi.post("/event/participation", eventRequest);
};
