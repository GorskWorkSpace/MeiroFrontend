import { useAppDispatch } from "../../../../app/store/hooks";
import { setFilters } from "../../../../entities/event";
import { Button } from "../../../../shared/ui/button";
import type { FilterValues } from "../../model/filterValues";
import { ResetFilters } from "../ResetFilters/ResetFilters";
import styles from "./FilterFooter.module.css";

interface FilterFooterProps {
  filters: FilterValues;
  onClose: () => void;
}

export const FilterFooter = ({ filters, onClose }: FilterFooterProps) => {
  const dispatch = useAppDispatch();

  const handleShow = () => {
    dispatch(setFilters(filters));
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.fullWidthButton}>
          <Button className={styles.buttonFullWidth} onClick={handleShow}>
            Показать
          </Button>
        </div>
        <ResetFilters onClose={onClose} />
      </div>
    </div>
  );
};
