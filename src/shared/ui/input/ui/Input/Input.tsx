import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export const Input = ({ type = "text", ...inputProps }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <input className={styles.input} type={type} {...inputProps} />
      </div>
    </div>
  );
};
