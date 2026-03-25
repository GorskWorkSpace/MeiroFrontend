import { EventDetail } from "../../../widgets/event-detail";
import styles from "./EventDetailPage.module.css";

export const EventDetailPage = () => {
  return (
    <div className={styles.container}>
      <EventDetail />
    </div>
  );
};
