import type { RootState } from "../../../app/store/store";

export const selectFavouritePendingIds = (state: RootState) =>
  state.favourite?.pendingIds || [];
export const selectIsFavouritePending = (id: string) => (state: RootState) =>
  state.favourite?.pendingIds?.includes(id) || false;
