import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../../shared/lib/getErrorMessage";
import { changeUserCity, fetchAllCities, fetchUserCity } from "../api/cityApi";

export const fetchAllCitiesThunk = createAsyncThunk(
  "city/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllCities();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch cities"));
    }
  },
);

export const fetchUserCityThunk = createAsyncThunk(
  "city/fetchUserCity",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUserCity();
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch user city"),
      );
    }
  },
);

export const changeCityThunk = createAsyncThunk(
  "city/changeCity",
  async (id: string, { rejectWithValue }) => {
    try {
      return await changeUserCity(id);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to change city"));
    }
  },
);
