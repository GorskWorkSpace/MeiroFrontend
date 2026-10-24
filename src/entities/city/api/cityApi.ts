import { baseApi } from "../../../shared/api/baseApi";
import { USE_MOCKS } from "../../../shared/config/mocks";
import { delay } from "../../../shared/lib/delay";
import { cityMocks } from "../model/mocks";
import { getSavedCity, saveCity } from "../model/storage";
import type {
  AllCitiesResponse,
  City,
  UserCityResponse,
} from "../model/types";

export const fetchAllCities = async (): Promise<City[]> => {
  if (USE_MOCKS) {
    await delay(500);
    return cityMocks;
  }

  const { data } = await baseApi.get<AllCitiesResponse>("/city/all");
  return data.cities;
};

export const fetchUserCity = async (): Promise<UserCityResponse> => {
  if (USE_MOCKS) {
    await delay(300);
    return getSavedCity() ?? cityMocks[0];
  }

  const { data } = await baseApi.get<UserCityResponse>("/user/city");
  return data;
};

export const changeUserCity = async (id: string): Promise<UserCityResponse> => {
  if (USE_MOCKS) {
    await delay(300);
    const selectedCity = cityMocks.find((city) => city.id === id);

    if (selectedCity) {
      saveCity(selectedCity);
    }

    return selectedCity ?? { id, cityName: "Москва" };
  }

  const { data } = await baseApi.put<UserCityResponse>("/user/city/change", {
    id,
  });
  return data;
};
