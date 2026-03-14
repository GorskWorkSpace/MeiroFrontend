import styles from "./EventCardSkeleton.module.css";

export const EventCardSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card} />
      <div className={styles.description}>
        <div className={styles.descriptionItem} />
        <div className={styles.descriptionItem} />
      </div>
    </div>
  );
};
