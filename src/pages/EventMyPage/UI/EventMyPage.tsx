import { useNavigate } from "react-router-dom";
import { FavouriteList } from "../../../features/favourite-list/UI/FavouriteList";
import { Menu } from "../../../features/menu/ui/Menu";
import { ArrowLeftIcon } from "../../../shared/assets";
import { Footer } from "../../../shared/ui/footer";
import styles from "./EventMyPage.module.css";
import { Seo } from "../../../shared/ui/Seo/seo";

export const EventMyPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Seo title="Избранное" description="" />
      <header className={styles.headerContainer}>
        <ArrowLeftIcon onClick={() => navigate("/")} />
        <h1 className={styles.logo}>MEIRO</h1>
        <div></div>
      </header>
      <main>
        <FavouriteList />
      </main>
      <Footer className={styles.footer}>
        <Menu />
      </Footer>
    </>
  );
};
