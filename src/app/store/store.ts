import { configureStore } from "@reduxjs/toolkit";
import { adReducer } from "../../entities/ad";
import { categoryReducer } from "../../entities/category";
import { cityReducer } from "../../entities/city";
import { eventReducer } from "../../entities/event";
import { favouriteReducer } from "../../features/favourite";

export const store = configureStore({
  reducer: {
    city: cityReducer,
    ad: adReducer,
    event: eventReducer,
    favourite: favouriteReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
