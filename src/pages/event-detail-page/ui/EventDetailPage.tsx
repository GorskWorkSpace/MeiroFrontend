import { EventDetail } from "../../../widgets/event-detail";
import { MainFooter } from "../../../widgets/main-footer";
import styles from "./EventDetailPage.module.css";

export const EventDetailPage = () => {
  return (
    <div className={styles.container}>
      <EventDetail />
      <MainFooter />
    </div>
  );
};
