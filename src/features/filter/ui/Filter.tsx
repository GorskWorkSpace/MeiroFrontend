import { FilterIcon } from "../../../shared/assets/icons/FilterIcon";
import styles from "./Filter.module.css";

interface FilterProps {
  onClick?: () => void;
}

export const Filter = ({ onClick }: FilterProps) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <div className={styles.iconWrapper} onClick={handleClick}>
      <FilterIcon />
    </div>
  );
};
