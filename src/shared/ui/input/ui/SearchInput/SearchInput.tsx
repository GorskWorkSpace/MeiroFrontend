import { type InputHTMLAttributes } from "react";
import { SearchIcon } from "../../../../assets";
import styles from "./SearchInput.module.css";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onClear?: () => void;
}

export const SearchInput = ({
  placeholder,
  value,
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
    </div>
  );
};
