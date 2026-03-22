import { Modal } from "../../../../shared/ui/modal";
import { FilterFooter } from "../FilterFooter/FilterFooter";
import { FiltersList } from "./FiltersList";

interface ChooseFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChooseFiltersModal = ({
  isOpen,
  onClose,
}: ChooseFiltersModalProps) => {
  return (
    <Modal title="Фильтры" isOpen={isOpen} onClose={onClose}>
      <FiltersList isOpen={isOpen} />
      <FilterFooter onClose={onClose} />
    </Modal>
  );
};
