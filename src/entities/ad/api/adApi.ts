import { baseApi } from "../../../shared/api/baseApi";
import { adMocks } from "../model/adMocks";
import type { Ad, AdsResponse } from "../model/types";

const USE_MOCKS = false;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
    const ad = adMocks.find((ad) => ad.id === id);
    return ad || null;
  }

  const { data } = await baseApi.get<{ ad: Ad }>(`/ad/${id}`);
  return data.ad;
};
