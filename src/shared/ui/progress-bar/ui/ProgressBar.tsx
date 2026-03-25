
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  items: number;
  itemsAll: number;
}

export const ProgressBar = ({ items, itemsAll }: ProgressBarProps) => {
  const percent = (items / itemsAll) * 100;

  return (
    <div className={styles.track}>
      <div
        className={styles.fill}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};