import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/store";

export type Theme = "light" | "dark";

interface ThemeState {
  value: Theme;
}

const initialState: ThemeState = {
  value: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.value = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.value;
