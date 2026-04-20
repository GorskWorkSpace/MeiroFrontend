import { useAppSelector } from "../../../app/store/hooks";
import { selectEventDetail } from "../../../entities/event";
import { selectIsLoading } from "../../../entities/event/model/eventSlice";
import { Menu } from "../../../features/menu/ui/Menu";
import styles from "./DetailFooter.module.css";

export const DetailFooter = () => {
  const isLoading = useAppSelector(selectIsLoading);
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
