import { useDispatch } from "react-redux";
import { resetAllFilters } from "../../../../entities/event";
import { TrashIcon } from "../../../../shared/assets";
import styles from "./ResetFilters.module.css";

interface ResetFiltersProps {
  onClose?: () => void;
}

export const ResetFilters = ({ onClose }: ResetFiltersProps) => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetAllFilters());
    if (onClose) {
      onClose();
    }
  };

  return (
    <div onClick={handleReset} className={styles.container}>
      <TrashIcon />
    </div>
  );
};
