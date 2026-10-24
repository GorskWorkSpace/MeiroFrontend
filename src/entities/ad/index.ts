export { adReducer, adSlice, clearAds, clearCurrentAd, removeAd } from "./model/adSlice";
export { fetchAdByIdThunk, fetchAllAdsThunk } from "./model/adThunks";
export {
  selectAdsError,
  selectAdsLoading,
  selectAllAds,
  selectCurrentAd,
} from "./model/selectors";
export type { Ad, AdState } from "./model/types";

export { AdCard } from "./ui/AdCard";
export { AdCardSkeleton } from "./ui/AdCardSkeleton";
