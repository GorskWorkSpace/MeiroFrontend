import type { InputHTMLAttributes } from "react";
import styles from "./LoginInput.module.css";

interface LoginInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onClear?: () => void;
}

export const LoginInput = ({
  placeholder,
  value,
  onChange,
}: LoginInputProps) => {
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
