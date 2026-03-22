import { useState } from "react";
import { FilterIcon } from "../../../../shared/assets";

import { ChooseFiltersModal } from "../ChooseFiltersModal/ChooseFiltersModal";
import styles from "./Filter.module.css";

export const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={styles.iconWrapper} onClick={handleClick}>
        <FilterIcon />
      </div>
      <ChooseFiltersModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
};
