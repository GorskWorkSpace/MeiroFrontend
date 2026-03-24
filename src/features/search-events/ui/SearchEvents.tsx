import React from "react";
import { SearchInput } from "../../../shared/ui/input";
import { useSearchEvents } from "../lib/useSearchEvents";

interface SearchEventsProps {
  placeholder?: string;
  className?: string;
}

export const SearchEvents: React.FC<SearchEventsProps> = ({
  placeholder = "Поиск событий...",
}) => {
  const { searchValue, handleSearchChange } = useSearchEvents();

  return (
    <SearchInput
      placeholder={placeholder}
      value={searchValue}
      onChange={(e) => handleSearchChange(e.target.value)}
    />
  );
};
