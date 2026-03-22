import { Filter } from "../../../features/filter";
import { Menu } from "../../../features/menu/ui/Menu";
import { Footer } from "../../../shared/ui/footer";
import { SearchInput } from "../../../shared/ui/input";
import styles from "./MainFooter.module.css";

export const MainFooter = () => {
  return (
    <Footer>
      <div className={styles.container}>
        <SearchInput placeholder="Поиск событий..." />
        <div className={styles.buttons}>
          <Filter />
          <Menu />
        </div>
      </div>
    </Footer>
  );
};
