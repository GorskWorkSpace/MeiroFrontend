import type { CityState } from "./types";

type StateWithCity = { city: CityState };

export const selectAllCities = (state: StateWithCity) => state.city.cities;
export const selectSelectedCity = (state: StateWithCity) =>
  state.city.selectedCity;
export const selectCityLoading = (state: StateWithCity) => state.city.loading;
export const selectCityError = (state: StateWithCity) => state.city.error;
