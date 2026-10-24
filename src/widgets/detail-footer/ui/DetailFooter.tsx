import { useAppSelector } from "../../../app/store/hooks";
import {
  selectEventDetail,
  selectEventDetailLoading,
} from "../../../entities/event";
import { Menu } from "../../../features/menu";
import styles from "./DetailFooter.module.css";

export const DetailFooter = () => {
  const isLoading = useAppSelector(selectEventDetailLoading);
  const eventDetail = useAppSelector(selectEventDetail);

  if (!eventDetail || isLoading) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <Menu />
    </footer>
  );
};
