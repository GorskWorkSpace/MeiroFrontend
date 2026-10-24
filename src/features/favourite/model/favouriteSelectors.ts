import type { FavouriteState } from "./favouriteSlice";

type StateWithFavourite = { favourite: FavouriteState };

export const selectFavouritePendingIds = (state: StateWithFavourite) =>
  state.favourite.pendingIds;

export const selectIsFavouritePending =
  (id: string) => (state: StateWithFavourite) =>
    state.favourite.pendingIds.includes(id);
