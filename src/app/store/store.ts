import { configureStore } from '@reduxjs/toolkit';
import cityReducer from '../../entities/city/model/citySlice'
import { themeSlice } from '../../entities/theme';
import adReducer from '../../entities/ad'

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    city: cityReducer,
    ad: adReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;