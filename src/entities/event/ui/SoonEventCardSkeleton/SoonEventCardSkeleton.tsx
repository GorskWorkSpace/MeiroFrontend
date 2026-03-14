import styles from "./SoonEventCardSkeleton.module.css";

export const SoonEventCardSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title} />
        <div className={styles.link} />
      </div>
      <div className={styles.card} />
    </div>
  );
};
