import React from "react";
import { useDispatch } from "react-redux";
import { Accordion } from "../../../../shared/ui/accordion/ui/Accordion";
import { DatePicker, Input } from "../../../../shared/ui/input";
import { Tab } from "../../../../shared/ui/tab";
import { useFilters } from "../../lib/useFilters";
import {
  setCategoriesSearchQuery,
  setTempCategories,
  setTempCountPlace,
  setTempDate,
  setTempPrice,
  toggleTempCategory,
  toggleTempCountPlace,
} from "../../model/filtersSlice";
import styles from "../../ui/ChooseFiltersModal/FiltersList.module.css";

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

export const FiltersList: React.FC = () => {
  const dispatch = useDispatch();
  const {
    dateFilter,
    categoriesFilter,
    priceFilter,
    countPlaceFilter,
    searchValue,
    handleSearchChange,
  } = useFilters();

  const filteredCategories = MOCK_CATEGORIES.filter((category) =>
    category.toLowerCase().includes(categoriesFilter.searchQuery.toLowerCase()),
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };

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

  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCategoriesSearchQuery(e.target.value));
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
      <Accordion title="Дата" type="usual">
        <DatePicker
          placeholder="00.00.2026"
          selectedDate={
            dateFilter.tempSelected ? new Date(dateFilter.tempSelected) : null
          }
          onDateChange={handleDateChange}
        />
      </Accordion>

      <Accordion title="Категории" type="grid">
        <Tab
          onClick={handleAllCategoriesClick}
          isActive={isAllCategoriesSelected}
        >
          Все
        </Tab>

        <div className={styles.categoriesList}>
          {filteredCategories.map((category) => (
            <Tab
              key={category}
              onClick={() => handleCategoryToggle(category)}
              isActive={categoriesFilter.tempSelected.includes(category)}
            >
              {category}
            </Tab>
          ))}
        </div>
      </Accordion>

      <Accordion title="Цена" type="row">
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

      <Accordion title="Количество мест" type="grid">
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
