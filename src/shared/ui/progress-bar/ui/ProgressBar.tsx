import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  items: number;
  itemsAll: number;
}

export const ProgressBar = ({ items, itemsAll }: ProgressBarProps) => {
  const percent = itemsAll > 0 ? (items / itemsAll) * 100 : 0;

  return (
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: percent + "%" }} />
    </div>
  );
};
