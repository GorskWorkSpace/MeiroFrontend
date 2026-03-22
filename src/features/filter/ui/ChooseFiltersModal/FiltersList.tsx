import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEventFilters,
  selectFiltersOpen,
  selectTempFilters,
} from "../../../../entities/event";
import {
  setTempCategory,
  setTempCountPlace,
  setTempDate,
  setTempPriceFrom,
  setTempPriceTo,
  toggleFilterOpen,
} from "../../../../entities/event/model/eventSlice";
import { Accordion } from "../../../../shared/ui/accordion/ui/Accordion";
import { Input } from "../../../../shared/ui/input";
import { DatePicker } from "../../../../shared/ui/input/ui/DatePicker/DatePicker";
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
  isOpen?: boolean;
}

export const FiltersList: React.FC<FiltersListProps> = ({ isOpen }) => {
  const dispatch = useDispatch();
  const tempFilters = useSelector(selectTempFilters);
  const filters = useSelector(selectEventFilters);
  const filtersOpen = useSelector(selectFiltersOpen);

  useEffect(() => {
    if (isOpen) {
      dispatch(setTempDate(filters.date));
      dispatch(setTempCategory(filters.category));
      dispatch(setTempPriceFrom(filters.priceFrom));
      dispatch(setTempPriceTo(filters.priceTo));
      dispatch(setTempCountPlace(filters.countPlace));

      if (filters.date) {
        dispatch(toggleFilterOpen("date"));
      }
      if (filters.category) {
        dispatch(toggleFilterOpen("categories"));
      }
      if (filters.priceFrom !== undefined || filters.priceTo !== undefined) {
        dispatch(toggleFilterOpen("price"));
      }
      if (filters.countPlace) {
        dispatch(toggleFilterOpen("countPlace"));
      }
    }
  }, [isOpen, dispatch, filters]);

  const handleDateChange = (date: Date | null) => {
    dispatch(setTempDate(date?.toISOString() || undefined));
  };

  const handleAllCategoriesClick = () => {
    if (tempFilters.category === MOCK_CATEGORIES.join(",")) {
      dispatch(setTempCategory(undefined));
    } else {
      dispatch(setTempCategory(MOCK_CATEGORIES.join(",")));
    }
  };

  const isAllCategoriesSelected =
    tempFilters.category === MOCK_CATEGORIES.join(",");

  const handleCategoryToggle = (category: string) => {
    const currentCategories = tempFilters.category
      ? tempFilters.category.split(",")
      : [];
    let newCategories: string[];

    if (currentCategories.includes(category)) {
      newCategories = currentCategories.filter((c) => c !== category);
    } else {
      newCategories = [...currentCategories, category];
    }

    dispatch(
      setTempCategory(
        newCategories.length > 0 ? newCategories.join(",") : undefined,
      ),
    );
  };

  const isCategorySelected = (category: string) => {
    const categories = tempFilters.category
      ? tempFilters.category.split(",")
      : [];
    return categories.includes(category);
  };

  const handleAllCountPlaceClick = () => {
    dispatch(setTempCountPlace(undefined));
  };

  const isAllCountPlaceSelected = tempFilters.countPlace === undefined;

  const handleCountPlaceToggle = (value: "many" | "little") => {
    if (tempFilters.countPlace === value) {
      dispatch(setTempCountPlace(undefined));
    } else {
      dispatch(setTempCountPlace(value));
    }
  };

  const handlePriceFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setTempPriceFrom(value === "" ? undefined : Number(value)));
  };

  const handlePriceToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setTempPriceTo(value === "" ? undefined : Number(value)));
  };

  return (
    <div className={styles.container}>
      <Accordion
        title="Дата"
        type="usual"
        isOpen={filtersOpen.date}
        onToggle={() => dispatch(toggleFilterOpen("date"))}
      >
        <DatePicker
          placeholder="00.00.2026"
          selectedDate={tempFilters.date ? new Date(tempFilters.date) : null}
          onDateChange={handleDateChange}
        />
      </Accordion>

      <Accordion
        title="Категории"
        type="grid"
        isOpen={filtersOpen.categories}
        onToggle={() => dispatch(toggleFilterOpen("categories"))}
      >
        <Tab
          onClick={handleAllCategoriesClick}
          isActive={isAllCategoriesSelected}
        >
          Все
        </Tab>

        {MOCK_CATEGORIES.map((category) => (
          <Tab
            key={category}
            onClick={() => handleCategoryToggle(category)}
            isActive={isCategorySelected(category)}
          >
            {category}
          </Tab>
        ))}
      </Accordion>

      <Accordion
        title="Цена"
        type="row"
        isOpen={filtersOpen.price}
        onToggle={() => dispatch(toggleFilterOpen("price"))}
      >
        <Input
          placeholder="От"
          type="number"
          value={tempFilters.priceFrom?.toString() || ""}
          onChange={handlePriceFromChange}
        />
        <Input
          placeholder="До"
          type="number"
          value={tempFilters.priceTo?.toString() || ""}
          onChange={handlePriceToChange}
        />
      </Accordion>

      <Accordion
        title="Количество мест"
        type="grid"
        isOpen={filtersOpen.countPlace}
        onToggle={() => dispatch(toggleFilterOpen("countPlace"))}
      >
        <Tab
          onClick={handleAllCountPlaceClick}
          isActive={isAllCountPlaceSelected}
        >
          Все
        </Tab>

        {COUNT_PLACE_OPTIONS.map((option) => (
          <Tab
            key={option.value}
            onClick={() => handleCountPlaceToggle(option.value)}
            isActive={tempFilters.countPlace === option.value}
          >
            {option.label}
          </Tab>
        ))}
      </Accordion>
    </div>
  );
};
