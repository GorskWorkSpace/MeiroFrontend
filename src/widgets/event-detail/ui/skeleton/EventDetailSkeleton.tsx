import styles from "./EventDetailSkeleton.module.css";

export const EventDetailSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.img} />
      <div className={styles.category} />
      <div className={styles.title} />
      <div className={styles.description} />
      <div className={styles.date} />
      <div className={styles.price} />
    </div>
  );
};
