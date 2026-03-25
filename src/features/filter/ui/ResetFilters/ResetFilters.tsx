import { useDispatch } from "react-redux";
import { setFilters } from "../../../../entities/event";
import { TrashIcon } from "../../../../shared/assets";
import styles from "./ResetFilters.module.css";

interface ResetFiltersProps {
  onClose?: () => void;
}

export const ResetFilters = ({ onClose }: ResetFiltersProps) => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(
      setFilters({
        category: undefined,
        priceFrom: undefined,
        priceTo: undefined,
        countPlace: undefined,
        search: undefined,
      }),
    );
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
