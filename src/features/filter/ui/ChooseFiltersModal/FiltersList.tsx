import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion } from "../../../../shared/ui/accordion/ui/Accordion";
import { DatePicker, Input } from "../../../../shared/ui/input";
import { Tab } from "../../../../shared/ui/tab";
import { useFilters } from "../../lib/useFilters";
import {
  selectFiltersOpen,
  setTempCategories,
  setTempCountPlace,
  setTempDate,
  setTempPrice,
  toggleFilterOpen,
  toggleTempCategory,
  toggleTempCountPlace,
} from "../../model/filtersSlice";
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

const COUNT_PLACE_OPTIONS = ["Много мест", "Мало мест"];

interface FiltersListProps {
  isOpen?: boolean;
}

export const FiltersList: React.FC<FiltersListProps> = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { dateFilter, categoriesFilter, priceFilter, countPlaceFilter } =
    useFilters();

  const filtersOpen = useSelector(selectFiltersOpen);

  useEffect(() => {
    if (isOpen) {
      if (categoriesFilter.selected.length > 0) {
        dispatch(setTempCategories(categoriesFilter.selected));
      }
      if (countPlaceFilter.selected.length > 0) {
        dispatch(setTempCountPlace(countPlaceFilter.selected));
      }
      if (dateFilter.selected) {
        dispatch(setTempDate(dateFilter.selected));
      }
      if (priceFilter.from !== null || priceFilter.to !== null) {
        dispatch(
          setTempPrice({
            from: priceFilter.from,
            to: priceFilter.to,
          }),
        );
      }
    }
  }, [
    isOpen,
    dispatch,
    categoriesFilter.selected,
    countPlaceFilter.selected,
    dateFilter.selected,
    priceFilter.from,
    priceFilter.to,
  ]);

  const filteredCategories = MOCK_CATEGORIES.filter((category) =>
    category.toLowerCase().includes(categoriesFilter.searchQuery.toLowerCase()),
  );

  const handleAllCategoriesClick = () => {
    if (categoriesFilter.tempSelected.length === MOCK_CATEGORIES.length) {
      dispatch(setTempCategories([]));
    } else {
      dispatch(setTempCategories(MOCK_CATEGORIES));
    }
  };

  const isAllCategoriesSelected =
    categoriesFilter.tempSelected.length === MOCK_CATEGORIES.length;

  const handleAllCountPlaceClick = () => {
    if (countPlaceFilter.tempSelected.length === COUNT_PLACE_OPTIONS.length) {
      dispatch(setTempCountPlace([]));
    } else {
      dispatch(setTempCountPlace(COUNT_PLACE_OPTIONS));
    }
  };

  const isAllCountPlaceSelected =
    countPlaceFilter.tempSelected.length === COUNT_PLACE_OPTIONS.length;

  const handleCategoryToggle = (category: string) => {
    dispatch(toggleTempCategory(category));
  };

  const handleCountPlaceToggle = (option: string) => {
    dispatch(toggleTempCountPlace(option));
  };

  const handlePriceChange = (
    type: "from" | "to",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    const numValue = value === "" ? null : Number(value);
    dispatch(
      setTempPrice({
        from: type === "from" ? numValue : priceFilter.tempFrom,
        to: type === "to" ? numValue : priceFilter.tempTo,
      }),
    );
  };

  const handleDateChange = (date: Date | null) => {
    dispatch(setTempDate(date?.toISOString() || null));
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
          selectedDate={
            dateFilter.tempSelected ? new Date(dateFilter.tempSelected) : null
          }
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

        {filteredCategories.map((category) => (
          <Tab
            key={category}
            onClick={() => handleCategoryToggle(category)}
            isActive={categoriesFilter.tempSelected.includes(category)}
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
          value={priceFilter.tempFrom?.toString() || ""}
          onChange={(e) => handlePriceChange("from", e)}
        />
        <Input
          placeholder="До"
          type="number"
          value={priceFilter.tempTo?.toString() || ""}
          onChange={(e) => handlePriceChange("to", e)}
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
            key={option}
            onClick={() => handleCountPlaceToggle(option)}
            isActive={countPlaceFilter.tempSelected.includes(option)}
          >
            {option}
          </Tab>
        ))}
      </Accordion>
    </div>
  );
};
