import { useState } from "react";
import { useAppSelector } from "../../../../app/store/hooks";
import { selectEventFilters } from "../../../../entities/event";
import { FilterIcon } from "../../../../shared/assets";
import { cn } from "../../../../shared/lib/classNames";
import { hasActiveFilters } from "../../model/filterValues";
import { ChooseFiltersModal } from "../ChooseFiltersModal/ChooseFiltersModal";
import styles from "./Filter.module.css";

export const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filters = useAppSelector(selectEventFilters);
  const isActive = hasActiveFilters(filters);

  return (
    <div>
      <div
        className={cn(
          styles.iconWrapper,
          isActive ? styles.active : styles.inactive,
        )}
        onClick={() => setIsModalOpen(true)}
      >
        <FilterIcon />
      </div>
      <ChooseFiltersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
