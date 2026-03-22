import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch } from "../../../app/store/store";
import { setFiltersWithLoading } from "../../../entities/event/model/eventSlice";
import { fetchAllEventsThunk } from "../../../entities/event/model/eventThunks";
import { useDebounce } from "../../../shared/lib/hooks/useDebounce";
import {
  applyAllFilters,
  resetAllFilters,
  selectCategoriesFilter,
  selectCountPlaceFilter,
  selectDateFilter,
  selectPriceFilter,
} from "../model/filtersSlice";

export const useFilters = () => {
  const dispatch = useDispatch<AppDispatch>();

  const dateFilter = useSelector(selectDateFilter);
  const categoriesFilter = useSelector(selectCategoriesFilter);
  const priceFilter = useSelector(selectPriceFilter);
  const countPlaceFilter = useSelector(selectCountPlaceFilter);

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const isFirstSearch = useRef(true);

  const convertFiltersToApi = useCallback(
    (selectedCategories: string[], selectedCountPlace: string[]) => {
      const apiFilters: {
        category?: string;
        priceFrom?: number;
        priceTo?: number;
        countPlace?: "many" | "little";
      } = {};

      if (selectedCategories.length > 0) {
        apiFilters.category = selectedCategories.join(",");
      }

      if (priceFilter.from !== null) {
        apiFilters.priceFrom = priceFilter.from;
      }
      if (priceFilter.to !== null) {
        apiFilters.priceTo = priceFilter.to;
      }

      if (selectedCountPlace.includes("Много мест")) {
        apiFilters.countPlace = "many";
      } else if (selectedCountPlace.includes("Мало мест")) {
        apiFilters.countPlace = "little";
      }

      return apiFilters;
    },
    [priceFilter.from, priceFilter.to],
  );

  useEffect(() => {
    if (isFirstSearch.current) {
      isFirstSearch.current = false;
      return;
    }

    const apiFilters = convertFiltersToApi(
      categoriesFilter.selected,
      countPlaceFilter.selected,
    );

    const filtersForApi = {
      ...apiFilters,
      search: debouncedSearch || undefined,
      page: 0,
    };

    dispatch(fetchAllEventsThunk(filtersForApi));
    dispatch(setFiltersWithLoading(filtersForApi));
  }, [
    debouncedSearch,
    dispatch,
    convertFiltersToApi,
    categoriesFilter.selected,
    countPlaceFilter.selected,
  ]);

  const applyFilters = useCallback(() => {
    const tempCategories = categoriesFilter.tempSelected;
    const tempCountPlace = countPlaceFilter.tempSelected;

    dispatch(applyAllFilters());

    const apiFilters = convertFiltersToApi(tempCategories, tempCountPlace);

    const filtersForApi = {
      ...apiFilters,
      search: searchValue || undefined,
      page: 0,
    };

    dispatch(fetchAllEventsThunk(filtersForApi));
    dispatch(setFiltersWithLoading(filtersForApi));
  }, [
    dispatch,
    convertFiltersToApi,
    searchValue,
    categoriesFilter.tempSelected,
    countPlaceFilter.tempSelected,
  ]);

  const resetFilters = useCallback(() => {
    dispatch(resetAllFilters());
    setSearchValue("");
    dispatch(fetchAllEventsThunk({ page: 0 }));
    dispatch(setFiltersWithLoading({ page: 0 }));
  }, [dispatch]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  return {
    dateFilter,
    categoriesFilter,
    priceFilter,
    countPlaceFilter,
    searchValue,
    handleSearchChange,
    applyFilters,
    resetFilters,
    convertFiltersToApi,
  };
};
