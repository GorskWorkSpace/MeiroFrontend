import { type InputHTMLAttributes } from "react";
import styles from "./Input.module.css";
import { CloseIcon, SearchIcon } from "../../../assets";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onClear?: () => void;
}

export const Input = ({
  placeholder,
  value,
  onClear,
  onChange,
}: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <SearchIcon />
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {value && (
        <span style={{ height: "24px" }} onClick={onClear}>
          <CloseIcon color="#1F1F1F" />
        </span>
      )}
    </div>
  );
};
