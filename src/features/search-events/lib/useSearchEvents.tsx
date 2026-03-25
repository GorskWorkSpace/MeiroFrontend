// Хук для поиска: после задержки диспатчит setFilters с search
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch } from "../../../app/store/store";
import {
  selectEventFilters,
  setFilters,
} from "../../../entities/event/model/eventSlice";
import { useDebounce } from "../../../shared/lib/hooks/useDebounce";

export const useSearchEvents = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector(selectEventFilters);

  const [searchValue, setSearchValue] = useState(filters.search || "");
  const debouncedSearch = useDebounce(searchValue, 500);
  const isFirstSearch = useRef(true);

  useEffect(() => {
    // Пропускаем первый рендер, чтобы не отправлять запрос при монтировании
    if (isFirstSearch.current) {
      isFirstSearch.current = false;
      return;
    }

    // При изменении debouncedSearch отправляем фильтр через setFilters
    dispatch(setFilters({
      search: debouncedSearch || undefined,
    }));
  }, [debouncedSearch, dispatch]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const clearSearch = () => {
    setSearchValue("");
    dispatch(setFilters({ search: undefined }));
  };

  return {
    searchValue,
    handleSearchChange,
    clearSearch,
  };
};