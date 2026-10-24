import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { selectEventFilters, setFilters } from "../../../entities/event";
import { useDebounce } from "../../../shared/lib/hooks/useDebounce";

const SEARCH_DEBOUNCE_MS = 500;

export const useSearchEvents = () => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector(selectEventFilters);

  const [searchValue, setSearchValue] = useState(search || "");
  const debouncedSearch = useDebounce(searchValue, SEARCH_DEBOUNCE_MS);
  const isFirstSearch = useRef(true);

  useEffect(() => {
    // Не сбрасываем фильтры при монтировании — только при вводе пользователя
    if (isFirstSearch.current) {
      isFirstSearch.current = false;
      return;
    }

    dispatch(setFilters({ search: debouncedSearch || undefined }));
  }, [debouncedSearch, dispatch]);

  const clearSearch = () => {
    setSearchValue("");
    dispatch(setFilters({ search: undefined }));
  };

  return {
    searchValue,
    handleSearchChange: setSearchValue,
    clearSearch,
  };
};
