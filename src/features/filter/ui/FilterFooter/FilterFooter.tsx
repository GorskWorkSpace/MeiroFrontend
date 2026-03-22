import { useDispatch } from "react-redux";
import { Button } from "../../../../shared/ui/button";
import { Footer } from "../../../../shared/ui/footer";
import { useFilters } from "../../lib/useFilters";
import { closeAllFilters } from "../../model/filtersSlice";
import { ResetFilters } from "../ResetFilters/ResetFilters";
import styles from "./FilterFooter.module.css";

interface FilterFooterProps {
  onClose: () => void;
}

export const FilterFooter = ({ onClose }: FilterFooterProps) => {
  const dispatch = useDispatch();
  const { applyFilters, resetFilters } = useFilters();

  const handleShow = () => {
    applyFilters();
    dispatch(closeAllFilters());
    onClose();
  };

  const handleReset = () => {
    resetFilters();
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      <Footer>
        <div className={styles.content}>
          <div className={styles.fullWidthButton}>
            <Button className={styles.buttonFullWidth} onClick={handleShow}>
              Показать
            </Button>
          </div>
          <ResetFilters onReset={handleReset} />
        </div>
      </Footer>
    </div>
  );
};
