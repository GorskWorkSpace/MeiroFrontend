import { motion } from "framer-motion";
import { EventCardSkeleton } from "../../../../entities/event";
import styles from "./EventsListSkeleton.module.css";

interface EventsListSkeletonProps {
  count?: number;
}

export const EventsListSkeleton = ({ count = 6 }: EventsListSkeletonProps) => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.title} />
      <div className={styles.grid}>
        {Array.from({ length: count }, (_, index) => (
          <EventCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    </motion.div>
  );
};
