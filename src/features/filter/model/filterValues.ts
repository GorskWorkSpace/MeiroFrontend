import type { EventFilters } from "../../../entities/event";

/** Фильтры, которые пользователь редактирует в модалке до применения */
export type FilterValues = Pick<
  EventFilters,
  "category" | "priceFrom" | "priceTo" | "countPlace"
>;

export type CountPlace = NonNullable<EventFilters["countPlace"]>;

export const pickFilterValues = ({
  category,
  priceFrom,
  priceTo,
  countPlace,
}: FilterValues): FilterValues => ({ category, priceFrom, priceTo, countPlace });

export const hasActiveFilters = (filters: FilterValues) =>
  Boolean(
    filters.category ||
      filters.priceFrom ||
      filters.priceTo ||
      filters.countPlace,
  );
