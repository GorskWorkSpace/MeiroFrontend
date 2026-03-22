import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch } from "../../../app/store/store";
import {
  selectEventFilters,
  setSearch,
} from "../../../entities/event/model/eventSlice";
import { fetchAllEventsThunk } from "../../../entities/event/model/eventThunks";
import { useDebounce } from "../../../shared/lib/hooks/useDebounce";

export const useSearchEvents = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector(selectEventFilters);

  const [searchValue, setSearchValue] = useState(filters.search || "");
  const debouncedSearch = useDebounce(searchValue, 500);
  const isFirstSearch = useRef(true);

  useEffect(() => {
    if (isFirstSearch.current) {
      isFirstSearch.current = false;
      return;
    }

    const filtersForApi = {
      ...filters,
      search: debouncedSearch || undefined,
      page: 0,
    };

    dispatch(setSearch(debouncedSearch || undefined));
    dispatch(fetchAllEventsThunk(filtersForApi));
  }, [debouncedSearch, dispatch, filters]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const clearSearch = () => {
    setSearchValue("");
    dispatch(setSearch(undefined));
    dispatch(
      fetchAllEventsThunk({
        ...filters,
        search: undefined,
        page: 0,
      }),
    );
  };

  return {
    searchValue,
    handleSearchChange,
    clearSearch,
  };
};
