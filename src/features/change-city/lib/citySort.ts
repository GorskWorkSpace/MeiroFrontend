import type { City } from "../../../entities/city";

export interface GroupedCities {
  [key: string]: City[];
}

export const groupCitiesByFirstLetter = (cities: City[] = []): GroupedCities => {
  if (!cities || !Array.isArray(cities)) {
    return {};
  }

  const grouped: GroupedCities = {};

  cities.forEach((city) => {
    if (city?.cityName) {
      const firstLetter = city.cityName.charAt(0).toUpperCase();

      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }

      grouped[firstLetter].push(city);
    }
  });

  return grouped;
};

export const getSortedLetters = (groupedCities: GroupedCities = {}): string[] => {
  if (!groupedCities || typeof groupedCities !== 'object') {
    return [];
  }
  return Object.keys(groupedCities).sort((a, b) => a.localeCompare(b));
};

export const sortCitiesInGroup = (cities: City[] = []): City[] => {
  if (!cities || !Array.isArray(cities)) {
    return [];
  }
  return [...cities].sort((a, b) => a.cityName.localeCompare(b.cityName));
};

export const processCities = (cities: City[] = []): GroupedCities => {
  if (!cities || !Array.isArray(cities)) {
    return {};
  }

  const grouped = groupCitiesByFirstLetter(cities);

  if (grouped && typeof grouped === 'object') {
    Object.keys(grouped).forEach((letter) => {
      if (Array.isArray(grouped[letter])) {
        grouped[letter] = sortCitiesInGroup(grouped[letter]);
      }
    });
  }

  return grouped;
};