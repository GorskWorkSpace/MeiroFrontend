import { configureStore } from "@reduxjs/toolkit";
import adReducer from "../../entities/ad";
import cityReducer from "../../entities/city/model/citySlice";
import eventReducer from "../../entities/event/model/eventSlice";
import { themeSlice } from "../../entities/theme";
import { favouriteReducer } from "../../features/favourite";
export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    city: cityReducer,
    ad: adReducer,
    event: eventReducer,
    favourite: favouriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
