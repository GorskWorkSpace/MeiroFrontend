import { type InputHTMLAttributes } from "react";
import { CloseIcon, SearchIcon } from "../../../../assets";
import styles from "./SearchInput.module.css";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onClear?: () => void;
}

export const SearchInput = ({
  placeholder,
  value,
  onClear,
  onChange,
}: SearchInputProps) => {
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
