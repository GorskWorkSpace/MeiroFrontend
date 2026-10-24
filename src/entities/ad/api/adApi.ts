import { baseApi } from "../../../shared/api/baseApi";
import { USE_MOCKS } from "../../../shared/config/mocks";
import { delay } from "../../../shared/lib/delay";
import { adMocks } from "../model/adMocks";
import type { Ad, AdsResponse } from "../model/types";

export const fetchAllAds = async (): Promise<Ad[]> => {
  if (USE_MOCKS) {
    await delay(600);
    return adMocks;
  }

  const { data } = await baseApi.get<AdsResponse>("/ad/all");
  return data.ads;
};

export const fetchAdById = async (id: string): Promise<Ad | null> => {
  if (USE_MOCKS) {
    await delay(300);
    return adMocks.find((ad) => ad.id === id) ?? null;
  }

  const { data } = await baseApi.get<{ ad: Ad }>(`/ad/${id}`);
  return data.ad;
};
