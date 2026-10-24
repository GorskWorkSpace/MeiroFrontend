import type { City } from "../../../entities/city";

export type GroupedCities = Record<string, City[]>;

const compareCities = (a: City, b: City) => a.cityName.localeCompare(b.cityName);

/** Группирует города по первой букве и сортирует внутри групп */
export const groupCitiesByFirstLetter = (cities: City[]): GroupedCities => {
  const grouped: GroupedCities = {};

  for (const city of cities) {
    if (!city?.cityName) continue;

    const firstLetter = city.cityName.charAt(0).toUpperCase();
    (grouped[firstLetter] ??= []).push(city);
  }

  for (const letter of Object.keys(grouped)) {
    grouped[letter].sort(compareCities);
  }

  return grouped;
};

export const getSortedLetters = (groupedCities: GroupedCities): string[] =>
  Object.keys(groupedCities).sort((a, b) => a.localeCompare(b));
