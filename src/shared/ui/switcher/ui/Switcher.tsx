import { useState } from "react";
import styles from "./Switcher.module.css";

export const Switcher = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      className={`${styles.switch} ${isActive ? styles.active : ""}`}
      onClick={() => setIsActive(!isActive)}
    >
      <div className={styles.slider} />
    </button>
  );
};
