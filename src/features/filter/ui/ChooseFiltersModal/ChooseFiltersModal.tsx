import { useState } from "react";
import { Modal } from "../../../../shared/ui/modal";
import { FilterFooter } from "../FilterFooter/FilterFooter";
import { FiltersList } from "./FiltersList";

interface ChooseFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Тип для локальных фильтров
interface LocalFilters {
  category?: string;
  priceFrom?: number;
  priceTo?: number;
  countPlace?: "many" | "little";
}

export const ChooseFiltersModal = ({
  isOpen,
  onClose,
}: ChooseFiltersModalProps) => {
  // Локальное состояние фильтров в модалке
  const [localFilters, setLocalFilters] = useState<LocalFilters>({});

  return (
    <Modal title="Фильтры" isOpen={isOpen} onClose={onClose}>
      <FiltersList
        localFilters={localFilters}
        onLocalFiltersChange={setLocalFilters}
      />
      <FilterFooter onClose={onClose} localFilters={localFilters} />
    </Modal>
  );
};
