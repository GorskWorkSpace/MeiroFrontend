import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "../../entities/city/model/citySlice";
import { themeSlice } from "../../entities/theme";
import adReducer from "../../entities/ad";
import eventReducer from "../../entities/event/model/eventSlice";
import { favouriteReducer } from "../../features/favourite";
import filtersReducer from "../../features/filter/model/filtersSlice"; 

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    city: cityReducer,
    ad: adReducer,
    event: eventReducer,
    favourite: favouriteReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;