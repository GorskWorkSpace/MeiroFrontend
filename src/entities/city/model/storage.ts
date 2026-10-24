import type { City } from "./types";

const CITY_ID_KEY = "selectedCityId";
const CITY_NAME_KEY = "selectedCity";

export const getSavedCity = (): City | null => {
  const id = localStorage.getItem(CITY_ID_KEY);
  const cityName = localStorage.getItem(CITY_NAME_KEY);

  return id && cityName ? { id, cityName } : null;
};

export const saveCity = ({ id, cityName }: City) => {
  localStorage.setItem(CITY_ID_KEY, id);
  localStorage.setItem(CITY_NAME_KEY, cityName);
};
