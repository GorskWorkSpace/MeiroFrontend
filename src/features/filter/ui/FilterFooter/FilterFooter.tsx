import { useDispatch } from "react-redux";
import { setFilters } from "../../../../entities/event";
import { Button } from "../../../../shared/ui/button";
import { Footer } from "../../../../shared/ui/footer";
import { ResetFilters } from "../ResetFilters/ResetFilters";
import { useMediaQuery } from "../../../../shared/lib/hooks/useMediaQuery";
import styles from "./FilterFooter.module.css";

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
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleShow = () => {
    dispatch(
      setFilters({
        category: localFilters.category,
        priceFrom: localFilters.priceFrom,
        priceTo: localFilters.priceTo,
        countPlace: localFilters.countPlace,
      }),
    );
    onClose();
  };

  return (
    <div className={styles.wrapper}>
      <Footer classFoot={isDesktop ? "filterFooter" : "footerWrapper"}>
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
