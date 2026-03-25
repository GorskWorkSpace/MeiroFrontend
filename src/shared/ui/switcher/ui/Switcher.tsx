import styles from "./Switcher.module.css";

interface SwitcherProps {
  isActive: boolean;
  onToggle: () => void;
}

export const Switcher = ({ isActive, onToggle }: SwitcherProps) => {
  return (
    <button
      className={`${styles.switch} ${isActive ? styles.active : ""}`}
      onClick={onToggle}
    >
      <div className={styles.slider} />
    </button>
  );
};
