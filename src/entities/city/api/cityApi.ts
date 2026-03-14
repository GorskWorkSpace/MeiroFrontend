import { baseApi } from "../../../shared/api/baseApi";
import { cityMocks } from "../model/mocks";
import type { AllCitiesResponse, UserCityResponse } from "../model/types";

const USE_MOCKS = true;

export const fetchAllCities = async () => {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return cityMocks;
  }

  const { data } = await baseApi.get<AllCitiesResponse>("/city/all");
  return data.cities;
};

export const fetchUserCity = async () => {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const savedCityId = localStorage.getItem("selectedCityId");
    const savedCityName = localStorage.getItem("selectedCity");

    if (savedCityId && savedCityName) {
      return { id: savedCityId, cityName: savedCityName };
    }

    return { id: cityMocks[0].id, cityName: cityMocks[0].cityName };
  }

  const { data } = await baseApi.get<UserCityResponse>("/user/city");
  return data;
};

export const changeUserCity = async (id: string) => {
  if (USE_MOCKS) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const selectedCity = cityMocks.find((city) => city.id === id);

    if (selectedCity) {
      localStorage.setItem("selectedCityId", selectedCity.id);
      localStorage.setItem("selectedCity", selectedCity.cityName);
    }

    return {
      id: selectedCity?.id || id,
      cityName: selectedCity?.cityName || "Москва",
    };
  }

  const { data } = await baseApi.put<UserCityResponse>("/user/city/change", {
    id,
  });
  return data;
};
