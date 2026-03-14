import { createSlice } from "@reduxjs/toolkit";
import {
  changeCityThunk,
  fetchAllCitiesThunk,
  fetchUserCityThunk,
} from "./cityThunks";
import type { CityState } from "./types";

const getInitialCity = () => {
  const savedCityId = localStorage.getItem("selectedCityId");
  const savedCityName = localStorage.getItem("selectedCity");

  if (savedCityId && savedCityName) {
    return { id: savedCityId, cityName: savedCityName };
  }

  return null;
};

const initialState: CityState = {
  cities: [],
  selectedCity: getInitialCity(),
  loading: false,
  error: null,
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
        if (!state.selectedCity) {
          state.selectedCity = {
            id: action.payload.id || "",
            cityName: action.payload.cityName || "",
          };

          if (action.payload.id && action.payload.cityName) {
            localStorage.setItem("selectedCityId", action.payload.id);
            localStorage.setItem("selectedCity", action.payload.cityName);
          }
        }
        state.loading = false;
      })
      .addCase(changeCityThunk.fulfilled, (state, action) => {
        state.selectedCity = {
          id: action.payload.id || "",
          cityName: action.payload.cityName || "",
        };

        if (action.payload.id && action.payload.cityName) {
          localStorage.setItem("selectedCityId", action.payload.id);
          localStorage.setItem("selectedCity", action.payload.cityName);
        }
        state.loading = false;
      });
  },
});

export default citySlice.reducer;
