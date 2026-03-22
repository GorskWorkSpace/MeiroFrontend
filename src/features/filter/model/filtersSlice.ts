import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface FiltersState {
  date: {
    selected: string | null;
    tempSelected: string | null;
  };
  categories: {
    selected: string[];
    tempSelected: string[];
    searchQuery: string;
  };
  price: {
    from: number | null;
    to: number | null;
    tempFrom: number | null;
    tempTo: number | null;
  };
  countPlace: {
    selected: string[];
    tempSelected: string[];
  };
  isOpen: {
    date: boolean;
    categories: boolean;
    price: boolean;
    countPlace: boolean;
  };
  loading: boolean;
  error: string | null;
}

const initialState: FiltersState = {
  date: {
    selected: null,
    tempSelected: null,
  },
  categories: {
    selected: [],
    tempSelected: [],
    searchQuery: "",
  },
  price: {
    from: null,
    to: null,
    tempFrom: null,
    tempTo: null,
  },
  countPlace: {
    selected: [],
    tempSelected: [],
  },
  isOpen: {
    date: false,
    categories: false,
    price: false,
    countPlace: false,
  },
  loading: false,
  error: null,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTempDate: (state, action: PayloadAction<string | null>) => {
      state.date.tempSelected = action.payload;
    },
    applyDateFilter: (state) => {
      state.date.selected = state.date.tempSelected;
      state.isOpen.date = false;
    },
    resetDateFilter: (state) => {
      state.date.selected = null;
      state.date.tempSelected = null;
    },

    setTempCategories: (state, action: PayloadAction<string[]>) => {
      state.categories.tempSelected = action.payload;
    },
    toggleTempCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.categories.tempSelected.indexOf(category);
      if (index === -1) {
        state.categories.tempSelected.push(category);
      } else {
        state.categories.tempSelected.splice(index, 1);
      }
    },
    setCategoriesSearchQuery: (state, action: PayloadAction<string>) => {
      state.categories.searchQuery = action.payload;
    },
    applyCategoriesFilter: (state) => {
      state.categories.selected = [...state.categories.tempSelected];
      state.isOpen.categories = false;
    },
    resetCategoriesFilter: (state) => {
      state.categories.selected = [];
      state.categories.tempSelected = [];
      state.categories.searchQuery = "";
    },

    setTempPrice: (
      state,
      action: PayloadAction<{ from: number | null; to: number | null }>,
    ) => {
      state.price.tempFrom = action.payload.from;
      state.price.tempTo = action.payload.to;
    },
    applyPriceFilter: (state) => {
      state.price.from = state.price.tempFrom;
      state.price.to = state.price.tempTo;
      state.isOpen.price = false;
    },
    resetPriceFilter: (state) => {
      state.price.from = null;
      state.price.to = null;
      state.price.tempFrom = null;
      state.price.tempTo = null;
    },

    setTempCountPlace: (state, action: PayloadAction<string[]>) => {
      state.countPlace.tempSelected = action.payload;
    },
    toggleTempCountPlace: (state, action: PayloadAction<string>) => {
      const option = action.payload;
      const index = state.countPlace.tempSelected.indexOf(option);
      if (index === -1) {
        state.countPlace.tempSelected.push(option);
      } else {
        state.countPlace.tempSelected.splice(index, 1);
      }
    },
    applyCountPlaceFilter: (state) => {
      state.countPlace.selected = [...state.countPlace.tempSelected];
      state.isOpen.countPlace = false;
    },
    resetCountPlaceFilter: (state) => {
      state.countPlace.selected = [];
      state.countPlace.tempSelected = [];
    },

    toggleFilterOpen: (
      state,
      action: PayloadAction<keyof FiltersState["isOpen"]>,
    ) => {
      state.isOpen[action.payload] = !state.isOpen[action.payload];
    },
    closeAllFilters: (state) => {
      state.isOpen.date = false;
      state.isOpen.categories = false;
      state.isOpen.price = false;
      state.isOpen.countPlace = false;
    },

    applyAllFilters: (state) => {
      state.date.selected = state.date.tempSelected;
      state.categories.selected = [...state.categories.tempSelected];
      state.price.from = state.price.tempFrom;
      state.price.to = state.price.tempTo;
      state.countPlace.selected = [...state.countPlace.tempSelected];

      state.isOpen.date = false;
      state.isOpen.categories = false;
      state.isOpen.price = false;
      state.isOpen.countPlace = false;
    },

    resetAllFilters: (state) => {
      state.date.selected = null;
      state.date.tempSelected = null;
      state.categories.selected = [];
      state.categories.tempSelected = [];
      state.categories.searchQuery = "";
      state.price.from = null;
      state.price.to = null;
      state.price.tempFrom = null;
      state.price.tempTo = null;
      state.countPlace.selected = [];
      state.countPlace.tempSelected = [];

      state.isOpen.date = false;
      state.isOpen.categories = false;
      state.isOpen.price = false;
      state.isOpen.countPlace = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setTempDate,
  applyDateFilter,
  resetDateFilter,
  setTempCategories,
  toggleTempCategory,
  setCategoriesSearchQuery,
  applyCategoriesFilter,
  resetCategoriesFilter,
  setTempPrice,
  applyPriceFilter,
  resetPriceFilter,
  setTempCountPlace,
  toggleTempCountPlace,
  applyCountPlaceFilter,
  resetCountPlaceFilter,
  toggleFilterOpen,
  closeAllFilters,
  applyAllFilters,
  resetAllFilters,
  clearError,
} = filtersSlice.actions;

const selectFiltersRoot = (state: { filters?: FiltersState }) => state.filters;

export const selectDateFilter = createSelector(
  [selectFiltersRoot],
  (filters) => ({
    selected: filters?.date?.selected ?? null,
    tempSelected: filters?.date?.tempSelected ?? null,
  }),
);

export const selectCategoriesFilter = createSelector(
  [selectFiltersRoot],
  (filters) => ({
    selected: filters?.categories?.selected ?? [],
    tempSelected: filters?.categories?.tempSelected ?? [],
    searchQuery: filters?.categories?.searchQuery ?? "",
  }),
);

export const selectPriceFilter = createSelector(
  [selectFiltersRoot],
  (filters) => ({
    from: filters?.price?.from ?? null,
    to: filters?.price?.to ?? null,
    tempFrom: filters?.price?.tempFrom ?? null,
    tempTo: filters?.price?.tempTo ?? null,
  }),
);

export const selectCountPlaceFilter = createSelector(
  [selectFiltersRoot],
  (filters) => ({
    selected: filters?.countPlace?.selected ?? [],
    tempSelected: filters?.countPlace?.tempSelected ?? [],
  }),
);

export const selectFiltersOpen = createSelector(
  [selectFiltersRoot],
  (filters) => ({
    date: filters?.isOpen?.date ?? false,
    categories: filters?.isOpen?.categories ?? false,
    price: filters?.isOpen?.price ?? false,
    countPlace: filters?.isOpen?.countPlace ?? false,
  }),
);

export const selectActiveFiltersCount = createSelector(
  [selectFiltersRoot],
  (filters) => {
    if (!filters) return 0;
    let count = 0;
    if (filters.date.selected) count++;
    if (filters.categories.selected.length > 0) count++;
    if (filters.price.from !== null || filters.price.to !== null) count++;
    if (filters.countPlace.selected.length > 0) count++;
    return count;
  },
);

export const selectIsAnyFilterActive = createSelector(
  [selectActiveFiltersCount],
  (count) => count > 0,
);

export default filtersSlice.reducer;
