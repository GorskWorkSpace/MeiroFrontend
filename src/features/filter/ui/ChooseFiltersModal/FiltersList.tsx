import { useAppSelector } from "../../../../app/store/hooks";
import { selectCategories } from "../../../../entities/category";
import { Accordion } from "../../../../shared/ui/accordion";
import { Input } from "../../../../shared/ui/input";
import { Tab } from "../../../../shared/ui/tab";
import type { CountPlace, FilterValues } from "../../model/filterValues";
import styles from "./FiltersList.module.css";

const ALL_CATEGORIES = "Все";

const COUNT_PLACE_OPTIONS: Array<{ value: CountPlace; label: string }> = [
  { value: "many", label: "Много мест" },
  { value: "little", label: "Мало мест" },
];

const parsePrice = (value: string) => (value === "" ? undefined : Number(value));

interface FiltersListProps {
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
}

export const FiltersList = ({ filters, onChange }: FiltersListProps) => {
  const categories = useAppSelector(selectCategories);

  const update = (patch: Partial<FilterValues>) =>
    onChange({ ...filters, ...patch });

  const toggleCountPlace = (value: CountPlace) =>
    update({ countPlace: filters.countPlace === value ? undefined : value });

  return (
    <div className={styles.container}>
      <Accordion title="Категории" type="grid">
        <Tab
          variant="accent"
          onClick={() => update({ category: ALL_CATEGORIES })}
          isActive={filters.category === ALL_CATEGORIES}
        >
          {ALL_CATEGORIES}
        </Tab>

        {categories.map((category) => (
          <Tab
            variant="accent"
            key={category.categoryId}
            onClick={() => update({ category: category.categoryId })}
            isActive={filters.category === category.categoryId}
          >
            {category.name}
          </Tab>
        ))}
      </Accordion>

      <Accordion title="Цена" type="row">
        <Input
          placeholder="От"
          type="number"
          value={filters.priceFrom?.toString() ?? ""}
          onChange={(e) => update({ priceFrom: parsePrice(e.target.value) })}
        />
        <Input
          placeholder="До"
          type="number"
          value={filters.priceTo?.toString() ?? ""}
          onChange={(e) => update({ priceTo: parsePrice(e.target.value) })}
        />
      </Accordion>

      <Accordion title="Количество мест" type="grid">
        <Tab
          variant="accent"
          onClick={() => update({ countPlace: undefined })}
          isActive={filters.countPlace === undefined}
        >
          Все
        </Tab>

        {COUNT_PLACE_OPTIONS.map((option) => (
          <Tab
            variant="accent"
            key={option.value}
            onClick={() => toggleCountPlace(option.value)}
            isActive={filters.countPlace === option.value}
          >
            {option.label}
          </Tab>
        ))}
      </Accordion>
    </div>
  );
};
