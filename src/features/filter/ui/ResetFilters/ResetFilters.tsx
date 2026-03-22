import { TrashIcon } from "../../../../shared/assets";
import styles from "./ResetFilters.module.css";

interface ResetFiltersProps {
  onReset: () => void;
}

export const ResetFilters = ({ onReset }: ResetFiltersProps) => {
  return (
    <div onClick={onReset} className={styles.container}>
      <TrashIcon />
    </div>
  );
};
