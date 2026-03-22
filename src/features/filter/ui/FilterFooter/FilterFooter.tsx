import { useDispatch } from "react-redux";
import { applyTempFilters } from "../../../../entities/event";
import { Button } from "../../../../shared/ui/button";
import { Footer } from "../../../../shared/ui/footer";
import { ResetFilters } from "../ResetFilters/ResetFilters";
import styles from "./FilterFooter.module.css";

interface FilterFooterProps {
  onClose: () => void;
}

export const FilterFooter = ({ onClose }: FilterFooterProps) => {
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(applyTempFilters());
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
          <ResetFilters onClose={onClose} />
        </div>
      </Footer>
    </div>
  );
};
