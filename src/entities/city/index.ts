export { citySlice } from "./model/citySlice";
export * from "./model/cityThunks";
export * from "./model/types";
export { CityBadge } from "./ui/CityBadge";
export { CityBadgeSkeleton } from "./ui/CityBadgeSkeleton";

import type { CityState } from "./model/types";

export const selectAllCities = (state: { city: CityState }) => state.city.cities;
export const selectSelectedCity = (state: { city: CityState }) => state.city.selectedCity;
export const selectCityLoading = (state: { city: CityState }) => state.city.loading;
export const selectCityError = (state: { city: CityState }) => state.city.error;