import { useNavigate } from "react-router-dom";
import { FavouriteList } from "../../../features/favourite-list";
import { Menu } from "../../../features/menu";
import { ArrowLeftIcon } from "../../../shared/assets";
import { ROUTES } from "../../../shared/config/routes";
import { Footer } from "../../../shared/ui/footer";
import { Seo } from "../../../shared/ui/seo";
import styles from "./MyEventsPage.module.css";

export const MyEventsPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Seo title="Избранное" description="" />
      <header className={styles.headerContainer}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(ROUTES.main)}
          aria-label="На главную"
        >
          <ArrowLeftIcon />
        </button>
        <h1 className={styles.logo}>MEIRO</h1>
      </header>
      <main>
        <FavouriteList />
      </main>
      <Footer className={styles.footer}>
        <Menu />
      </Footer>
    </div>
  );
};
