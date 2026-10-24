import type { InputHTMLAttributes } from "react";
import { SearchIcon } from "../../../../assets";
import styles from "./SearchInput.module.css";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export const SearchInput = ({
  type = "text",
  ...inputProps
}: SearchInputProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <SearchIcon />
        <input className={styles.input} type={type} {...inputProps} />
      </div>
    </div>
  );
};
