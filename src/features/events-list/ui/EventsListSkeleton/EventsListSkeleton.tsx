import React from "react";
import { EventCardSkeleton } from "../../../../entities/event";
import styles from "./EventsListSkeleton.module.css";
import { motion } from "framer-motion";

interface EventsGridSkeletonProps {
  count?: number;
}

export const EventsListSkeleton: React.FC<EventsGridSkeletonProps> = ({
  count = 6,
}) => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.title} />
      <div className={`${styles.grid}`}>
        {[...Array(count)].map((_, index) => (
          <EventCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    </motion.div>
  );
};
