import React from "react";
import { EventCardSkeleton } from "../../../../entities/event";
import styles from "./EventsListSkeleton.module.css";

interface EventsGridSkeletonProps {
  count?: number;
}

export const EventsListSkeleton: React.FC<EventsGridSkeletonProps> = ({
  count = 6,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title} />
      <div className={`${styles.grid}`}>
        {[...Array(count)].map((_, index) => (
          <EventCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    </div>
  );
};
