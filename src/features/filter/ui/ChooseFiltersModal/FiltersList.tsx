import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectEventFilters } from "../../../../entities/event";
// toggleFilterOpen - УБИРАЕМ, больше не нужен
import { Accordion } from "../../../../shared/ui/accordion/ui/Accordion";
import { Input } from "../../../../shared/ui/input";
import { Tab } from "../../../../shared/ui/tab";
import styles from "./FiltersList.module.css";

const MOCK_CATEGORIES = [
  "Юмор",
  "Концерт",
  "Спектакль",
  "Еда",
  "Спорт",
  "Образование",
  "Бизнес",
  "Другое",
];

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

  // При открытии модалки синхронизируем локальные фильтры с применёнными
  useEffect(() => {
    onLocalFiltersChange({
      category: appliedFilters.category,
      priceFrom: appliedFilters.priceFrom,
      priceTo: appliedFilters.priceTo,
      countPlace: appliedFilters.countPlace,
    });
  }, [appliedFilters, onLocalFiltersChange]);

  // Обработчики выбора категории (одиночный выбор)
  const handleCategorySelect = (category: string) => {
    if (category === "Все" || localFilters.category === category) {
      onLocalFiltersChange({ ...localFilters, category: undefined });
    } else {
      onLocalFiltersChange({ ...localFilters, category });
    }
  };

  const isCategorySelected = (category: string) => {
    if (category === "Все") {
      return localFilters.category === undefined;
    }
    return localFilters.category === category;
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
      {/* Категории - убираем onToggle, так как Accordion сам управляет своим состоянием */}
      <Accordion title="Категории" type="grid">
        <Tab
          variant="accent"
          onClick={() => handleCategorySelect("Все")}
          isActive={isCategorySelected("Все")}
        >
          Все
        </Tab>

        {MOCK_CATEGORIES.map((category) => (
          <Tab
            variant="accent"
            key={category}
            onClick={() => handleCategorySelect(category)}
            isActive={isCategorySelected(category)}
          >
            {category}
          </Tab>
        ))}
      </Accordion>

      {/* Цена */}
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

      {/* Количество мест */}
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
