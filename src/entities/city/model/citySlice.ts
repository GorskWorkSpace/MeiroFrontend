import { createSlice } from "@reduxjs/toolkit";
import { 
  fetchAllCitiesThunk, 
  fetchUserCityThunk, 
  changeCityThunk 
} from "./cityThunks";
import type { CityState } from "./types";

const initialState: CityState = {
  cities: [],
  selectedCity: null,
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
        if (Array.isArray(state.cities)) {
          const foundCity = state.cities.find(c => c?.cityName === action.payload?.cityName);
          
          state.selectedCity = {
            id: foundCity?.id || action.payload?.id || "", 
            cityName: action.payload?.cityName || ""
          };
          
          if (foundCity?.id) {
            localStorage.setItem("selectedCityId", foundCity.id);
            localStorage.setItem("selectedCity", action.payload?.cityName || "");
          }
        }
        state.loading = false;
      })
      .addCase(changeCityThunk.fulfilled, (state, action) => {
        if (Array.isArray(state.cities)) {
          const foundCity = state.cities.find(c => c?.cityName === action.payload?.cityName);
          
          state.selectedCity = {
            id: foundCity?.id || action.payload?.id || "", 
            cityName: action.payload?.cityName || ""
          };
        }
        state.loading = false;
      });
  },
});

export default citySlice.reducer;