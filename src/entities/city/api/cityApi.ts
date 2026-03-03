import { baseApi } from "../../../shared/api/baseApi";
import { cityMocks } from "../model/mocks";
import type { AllCitiesResponse, UserCityResponse } from "../model/types";


const USE_MOCKS = true; 

export const fetchAllCities = async () => {
  if (USE_MOCKS) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return cityMocks;
  }
  
  const { data } = await baseApi.get<AllCitiesResponse>("/city/all");
  return data.cities;
};

export const fetchUserCity = async () => {
  if (USE_MOCKS) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { id: "1", cityName: "Москва" };
  }
  
  const { data } = await baseApi.get<UserCityResponse>("/user/city");
  return data;
};

export const changeUserCity = async (id: string) => {
  if (USE_MOCKS) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const selectedCity = cityMocks.find(city => city.id === id);
    return { 
      id: selectedCity?.id || id, 
      cityName: selectedCity?.cityName || "Москва" 
    };
  }
  
  const { data } = await baseApi.put<UserCityResponse>("/user/city/change", { id });
  return data;
};