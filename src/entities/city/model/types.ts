export interface City {
  id: string;
  cityName: string;
}

export interface CityState {
  cities: City[];
  selectedCity: City | null;
  loading: boolean;
  error: string | null;
}

export interface AllCitiesResponse {
  cities: City[];
}

export interface UserCityResponse {
  id?: string;
  cityName: string;
}
