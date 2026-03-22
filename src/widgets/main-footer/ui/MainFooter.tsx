import { Filter } from "../../../features/filter";
import { Menu } from "../../../features/menu/ui/Menu";
import { SearchEvents } from "../../../features/search-events";
import { Footer } from "../../../shared/ui/footer";
import styles from "./MainFooter.module.css";

export const MainFooter = () => {
  return (
    <Footer>
      <div className={styles.container}>
        <SearchEvents placeholder="Поиск событий..." />
        <div className={styles.buttons}>
          <Filter />
          <Menu />
        </div>
      </div>
    </Footer>
  );
};
