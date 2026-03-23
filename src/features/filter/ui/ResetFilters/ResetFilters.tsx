import { useDispatch } from "react-redux";
import styles from "./ResetFilters.module.css";
import { TrashIcon } from "../../../../shared/assets";
import { setFilters } from "../../../../entities/event";

interface ResetFiltersProps {
  onClose?: () => void;
}

export const ResetFilters = ({ onClose }: ResetFiltersProps) => {
  const dispatch = useDispatch();

  const handleReset = () => {
    // Сбрасываем все фильтры — передаём пустой объект
    dispatch(setFilters({
      category: undefined,
      priceFrom: undefined,
      priceTo: undefined,
      countPlace: undefined,
      search: undefined,
    }));
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