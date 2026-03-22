import { Filter } from "../../../features/filter";
import { useFilters } from "../../../features/filter/lib/useFilters";
import { Menu } from "../../../features/menu/ui/Menu";
import { Footer } from "../../../shared/ui/footer";
import { SearchInput } from "../../../shared/ui/input";
import styles from "./MainFooter.module.css";

export const MainFooter = () => {
  const { searchValue, handleSearchChange } = useFilters();

  return (
    <Footer>
      <div className={styles.container}>
        <SearchInput
          placeholder="Поиск событий..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <div className={styles.buttons}>
          <Filter />
          <Menu />
        </div>
      </div>
    </Footer>
  );
};
