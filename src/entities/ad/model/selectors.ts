import type { AdState } from "./types";

type StateWithAd = { ad: AdState };

export const selectAllAds = (state: StateWithAd) => state.ad.ads;
export const selectCurrentAd = (state: StateWithAd) => state.ad.currentAd;
export const selectAdsLoading = (state: StateWithAd) => state.ad.loading;
export const selectAdsError = (state: StateWithAd) => state.ad.error;
