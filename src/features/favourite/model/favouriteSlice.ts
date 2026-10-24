import { createSlice } from "@reduxjs/toolkit";
import { toggleFavouriteThunk } from "../../../entities/event";

interface FavouriteState {
  /** id событий, для которых запрос на изменение избранного еще выполняется */
  pendingIds: string[];
  error: string | null;
}

const initialState: FavouriteState = {
  pendingIds: [],
  error: null,
};

const removePending = (state: FavouriteState, id: string) => {
  state.pendingIds = state.pendingIds.filter((pendingId) => pendingId !== id);
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavouriteThunk.pending, (state, action) => {
        const { id } = action.meta.arg;
        if (!state.pendingIds.includes(id)) {
          state.pendingIds.push(id);
        }
      })
      .addCase(toggleFavouriteThunk.fulfilled, (state, action) => {
        removePending(state, action.meta.arg.id);
      })
      .addCase(toggleFavouriteThunk.rejected, (state, action) => {
        removePending(state, action.meta.arg.id);
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = favouriteSlice.actions;
export const favouriteReducer = favouriteSlice.reducer;
export type { FavouriteState };
