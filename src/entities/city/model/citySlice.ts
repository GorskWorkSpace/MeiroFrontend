import { createSlice } from "@reduxjs/toolkit";
import {
  changeCityThunk,
  fetchAllCitiesThunk,
  fetchUserCityThunk,
} from "./cityThunks";
import { getSavedCity, saveCity } from "./storage";
import type { CityState, UserCityResponse } from "./types";

const initialState: CityState = {
  cities: [],
  selectedCity: getSavedCity(),
  loading: false,
  error: null,
};

const applySelectedCity = (state: CityState, city: UserCityResponse) => {
  state.selectedCity = { id: city.id || "", cityName: city.cityName || "" };

  if (city.id && city.cityName) {
    saveCity({ id: city.id, cityName: city.cityName });
  }
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCitiesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCitiesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllCitiesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.cities = [];
      })
      .addCase(fetchUserCityThunk.fulfilled, (state, action) => {
        // Город, выбранный пользователем вручную, имеет приоритет
        if (!state.selectedCity) {
          applySelectedCity(state, action.payload);
        }
        state.loading = false;
      })
      .addCase(changeCityThunk.fulfilled, (state, action) => {
        applySelectedCity(state, action.payload);
        state.loading = false;
      });
  },
});

export const cityReducer = citySlice.reducer;
