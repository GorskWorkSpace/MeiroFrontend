import { useNavigate } from "react-router-dom";
import { FavouriteList } from "../../../features/favourite-list/UI/FavouriteList";
import { Menu } from "../../../features/menu/ui/Menu";
import { ArrowLeftIcon } from "../../../shared/assets";
import { Footer } from "../../../shared/ui/footer";
import styles from "./EventMyPage.module.css";

export const EventMyPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.headerContainer}>
        <ArrowLeftIcon onClick={() => navigate("/")} />
        <p className={styles.logo}>MEIRO</p>
        <div></div>
      </div>
      <FavouriteList />
      <Footer className={styles.footer}>
        <Menu />
      </Footer>
    </div>
  );
};
