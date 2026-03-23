import { useDispatch } from "react-redux";
import { Footer } from "../../../../shared/ui/footer";
import { setFilters } from "../../../../entities/event";
import { Button } from "../../../../shared/ui/button";
import styles from "./FilterFooter.module.css";
import { ResetFilters } from "../ResetFilters/ResetFilters";

interface FilterFooterProps {
  onClose: () => void;
  localFilters: {
    category?: string;
    priceFrom?: number;
    priceTo?: number;
    countPlace?: "many" | "little";
  };
}

export const FilterFooter = ({ onClose, localFilters }: FilterFooterProps) => {
  const dispatch = useDispatch();

  const handleShow = () => {
    // Применяем выбранные фильтры через setFilters
    dispatch(setFilters({
      category: localFilters.category,
      priceFrom: localFilters.priceFrom,
      priceTo: localFilters.priceTo,
      countPlace: localFilters.countPlace,
    }));
    onClose(); // закрываем модалку
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