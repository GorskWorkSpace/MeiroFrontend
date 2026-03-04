import type { Ad, AdState } from "./model/types";

export { adSlice, default } from "./model/adSlice";
export { fetchAllAdsThunk, fetchAdByIdThunk } from "./model/adThunks";
export type { Ad, AdState } from "./model/types";

export { adMocks } from "./model/mocks";

export const selectAllAds = (state: { ad: AdState }) => state.ad.ads;
export const selectCurrentAd = (state: { ad: AdState }) => state.ad.currentAd;
export const selectAdsLoading = (state: { ad: AdState }) => state.ad.loading;
export const selectAdsError = (state: { ad: AdState }) => state.ad.error;

export const isExternalAd = (ad: Ad): boolean => !!ad.url;
export const isInternalAd = (ad: Ad): boolean => !ad.url;

export { AdCard } from "./ui/AdCard";