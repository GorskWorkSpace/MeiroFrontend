import { useState } from "react";
import { useAppSelector } from "../../../../app/store/hooks";
import { FilterIcon } from "../../../../shared/assets";

import { selectIsAnyFilterActive } from "../../model/filtersSlice";
import { ChooseFiltersModal } from "../ChooseFiltersModal/ChooseFiltersModal";
import styles from "./Filter.module.css";

export const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAnyFilterActive = useAppSelector(selectIsAnyFilterActive);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className={`${styles.iconWrapper} ${isAnyFilterActive ? styles.active : styles.inactive} `}
        onClick={handleClick}
      >
        <FilterIcon />
      </div>
      <ChooseFiltersModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
};
