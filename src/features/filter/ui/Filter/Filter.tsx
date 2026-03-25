import { useState } from "react";
import { useAppSelector } from "../../../../app/store/hooks";
import { selectEventFilters } from "../../../../entities/event";
import { FilterIcon } from "../../../../shared/assets";

import styles from "./Filter.module.css";
import { ChooseFiltersModal } from "../ChooseFiltersModal/ChooseFiltersModal";

export const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filters = useAppSelector(selectEventFilters);

  const isAnyFilterActive = !!(
    filters.category ||
    filters.priceFrom ||
    filters.priceTo ||
    filters.countPlace
    // filters.date - УБИРАЕМ
  );

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className={`${styles.iconWrapper} ${isAnyFilterActive ? styles.active : styles.inactive}`}
        onClick={handleClick}
      >
        <FilterIcon />
      </div>
      <ChooseFiltersModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
};