import { useState } from "react";
import { useAppSelector } from "../../../../app/store/hooks";
import { selectEventFilters } from "../../../../entities/event";
import { Modal } from "../../../../shared/ui/modal";
import { pickFilterValues, type FilterValues } from "../../model/filterValues";
import { FilterFooter } from "../FilterFooter/FilterFooter";
import { FiltersList } from "./FiltersList";

interface ChooseFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Монтируется при каждом открытии модалки, поэтому черновик всегда начинается с примененных фильтров
const FiltersForm = ({ onClose }: { onClose: () => void }) => {
  const appliedFilters = useAppSelector(selectEventFilters);
  const [draft, setDraft] = useState<FilterValues>(() =>
    pickFilterValues(appliedFilters),
  );

  return (
    <>
      <FiltersList filters={draft} onChange={setDraft} />
      <FilterFooter filters={draft} onClose={onClose} />
    </>
  );
};

export const ChooseFiltersModal = ({
  isOpen,
  onClose,
}: ChooseFiltersModalProps) => {
  return (
    <Modal title="Фильтры" isOpen={isOpen} onClose={onClose}>
      <FiltersForm onClose={onClose} />
    </Modal>
  );
};
