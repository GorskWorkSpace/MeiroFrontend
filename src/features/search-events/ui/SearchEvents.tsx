import { SearchInput } from "../../../shared/ui/input";
import { useSearchEvents } from "../lib/useSearchEvents";

interface SearchEventsProps {
  placeholder?: string;
}

export const SearchEvents = ({
  placeholder = "Поиск событий...",
}: SearchEventsProps) => {
  const { searchValue, handleSearchChange } = useSearchEvents();

  return (
    <SearchInput
      placeholder={placeholder}
      value={searchValue}
      onChange={(e) => handleSearchChange(e.target.value)}
    />
  );
};
