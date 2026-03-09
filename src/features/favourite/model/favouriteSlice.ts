import { createSlice } from "@reduxjs/toolkit";
import { toggleFavouriteThunk } from "./favouriteThunks";

interface FavouriteState {
  pendingIds: string[];
  error: string | null;
}

const initialState: FavouriteState = {
  pendingIds: [],
  error: null,
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
        const id = action.meta.arg.id;
        if (!state.pendingIds.includes(id)) {
          state.pendingIds.push(id);
        }
      })
      .addCase(toggleFavouriteThunk.fulfilled, (state, action) => {
        state.pendingIds = state.pendingIds.filter(
          (id) => id !== action.payload.id,
        );
      })
      .addCase(toggleFavouriteThunk.rejected, (state, action) => {
        const id = action.meta.arg.id;
        state.pendingIds = state.pendingIds.filter(
          (pendingId) => pendingId !== id,
        );
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = favouriteSlice.actions;
export default favouriteSlice.reducer;
