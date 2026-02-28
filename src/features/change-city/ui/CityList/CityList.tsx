import { useMemo } from "react";
import type { City } from "../../../../entities/city";
import { getSortedLetters, processCities } from "../../lib/citySort";
import styles from "./CityList.module.css";

interface CityListProps {
  cities: City[];
  onCitySelect: (cityId: string, cityName: string) => void;
}

export const CityList = ({ cities = [], onCitySelect }: CityListProps) => {
  const groupedCities = useMemo(() => {
    if (!cities || !Array.isArray(cities)) {
      return {};
    }
    return processCities(cities);
  }, [cities]);

  const sortedLetters = useMemo(() => {
    return getSortedLetters(groupedCities);
  }, [groupedCities]);

  if (!cities || !Array.isArray(cities) || cities.length === 0) {
    return <div className={styles.empty}>Ничего не найдено</div>;
  }

  if (!groupedCities || Object.keys(groupedCities).length === 0) {
    return <div className={styles.empty}>Ничего не найдено</div>;
  }

  return (
    <div>
      {sortedLetters.map((letter) => (
        <div key={letter} className={styles.listContainer}>
          <p className={styles.letter}>{letter}</p>
          <div className={styles.citiesList}>
            {groupedCities[letter]?.map((city) => (
              <div
                onClick={() => onCitySelect(city.id, city.cityName)}
                key={city.id}
                className={styles.city}
              >
                {city.cityName}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};