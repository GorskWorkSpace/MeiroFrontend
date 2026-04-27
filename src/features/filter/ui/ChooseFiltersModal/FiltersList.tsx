import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectEventFilters } from "../../../../entities/event";
import { Accordion } from "../../../../shared/ui/accordion/ui/Accordion";
import { Input } from "../../../../shared/ui/input";
import { Tab } from "../../../../shared/ui/tab";
import styles from "./FiltersList.module.css";
import { useAppSelector } from "../../../../app/store/hooks";

const COUNT_PLACE_OPTIONS: Array<{ value: "many" | "little"; label: string }> =
  [
    { value: "many", label: "Много мест" },
    { value: "little", label: "Мало мест" },
  ];

interface FiltersListProps {
  localFilters: {
    category?: string;
    priceFrom?: number;
    priceTo?: number;
    countPlace?: "many" | "little";
  };
  onLocalFiltersChange: (filters: any) => void;
}

export const FiltersList: React.FC<FiltersListProps> = ({
  localFilters,
  onLocalFiltersChange,
}) => {
  const appliedFilters = useSelector(selectEventFilters);
  const categories = useAppSelector((state) => state.category.categories);

  useEffect(() => {
    onLocalFiltersChange({
      category: appliedFilters.category,
      priceFrom: appliedFilters.priceFrom,
      priceTo: appliedFilters.priceTo,
      countPlace: appliedFilters.countPlace,
    });
  }, [appliedFilters, onLocalFiltersChange]);

  const handleCategorySelect = (id: string) => {
    onLocalFiltersChange({ ...localFilters, category: id });
  };

  const isCategorySelected = (id: string) => {
    return localFilters.category === id;
  };

  const handleCountPlaceSelect = (value: "many" | "little") => {
    if (localFilters.countPlace === value) {
      onLocalFiltersChange({ ...localFilters, countPlace: undefined });
    } else {
      onLocalFiltersChange({ ...localFilters, countPlace: value });
    }
  };

  const handlePriceFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onLocalFiltersChange({
      ...localFilters,
      priceFrom: value === "" ? undefined : Number(value),
    });
  };

  const handlePriceToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onLocalFiltersChange({
      ...localFilters,
      priceTo: value === "" ? undefined : Number(value),
    });
  };

  return (
    <div className={styles.container}>
      <Accordion title="Категории" type="grid">
        <Tab
          variant="accent"
          onClick={() => handleCategorySelect("Все")}
          isActive={isCategorySelected("Все")}
        >
          Все
        </Tab>

        {categories.map((category) => (
          <Tab
            variant="accent"
            key={category.categoryId}
            onClick={() => handleCategorySelect(category.categoryId)}
            isActive={isCategorySelected(category.categoryId)}
          >
            {category.name}
          </Tab>
        ))}
      </Accordion>

      <Accordion title="Цена" type="row">
        <Input
          placeholder="От"
          type="number"
          value={localFilters.priceFrom?.toString() || ""}
          onChange={handlePriceFromChange}
        />
        <Input
          placeholder="До"
          type="number"
          value={localFilters.priceTo?.toString() || ""}
          onChange={handlePriceToChange}
        />
      </Accordion>

      <Accordion title="Количество мест" type="grid">
        <Tab
          variant="accent"
          onClick={() =>
            onLocalFiltersChange({ ...localFilters, countPlace: undefined })
          }
          isActive={localFilters.countPlace === undefined}
        >
          Все
        </Tab>

        {COUNT_PLACE_OPTIONS.map((option) => (
          <Tab
            variant="accent"
            key={option.value}
            onClick={() => handleCountPlaceSelect(option.value)}
            isActive={localFilters.countPlace === option.value}
          >
            {option.label}
          </Tab>
        ))}
      </Accordion>
    </div>
  );
};
