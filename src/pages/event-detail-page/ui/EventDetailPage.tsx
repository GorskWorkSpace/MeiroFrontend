import { motion } from "framer-motion";
import { useAppSelector } from "../../../app/store/hooks";
import { selectEventDetail } from "../../../entities/event";
import { Seo } from "../../../shared/ui/seo";
import { DetailFooter } from "../../../widgets/detail-footer";
import { EventDetail } from "../../../widgets/event-detail";
import styles from "./EventDetailPage.module.css";

export const EventDetailPage = () => {
  const eventDetail = useAppSelector(selectEventDetail);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Seo
        title={eventDetail?.title || "Мероприятие"}
        description={eventDetail?.description || eventDetail?.title || ""}
        image={eventDetail?.imgs?.[0]}
      />
      <div className={styles.container}>
        <EventDetail />
        <DetailFooter />
      </div>
    </motion.div>
  );
};
