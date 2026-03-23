import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onClear?: () => void;
}

export const Input = ({ placeholder, value, onChange }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
