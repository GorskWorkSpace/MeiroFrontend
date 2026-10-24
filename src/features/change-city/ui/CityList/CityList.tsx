import { useMemo } from "react";
import type { City } from "../../../../entities/city";
import {
  getSortedLetters,
  groupCitiesByFirstLetter,
} from "../../lib/citySort";
import styles from "./CityList.module.css";

interface CityListProps {
  cities: City[];
  onCitySelect: (cityId: string) => void;
}

export const CityList = ({ cities, onCitySelect }: CityListProps) => {
  const groupedCities = useMemo(
    () => groupCitiesByFirstLetter(cities),
    [cities],
  );
  const sortedLetters = useMemo(
    () => getSortedLetters(groupedCities),
    [groupedCities],
  );

  if (sortedLetters.length === 0) {
    return <div className={styles.empty}>Ничего не найдено</div>;
  }

  return (
    <div>
      {sortedLetters.map((letter) => (
        <div key={letter} className={styles.listContainer}>
          <p className={styles.letter}>{letter}</p>
          <div className={styles.citiesList}>
            {groupedCities[letter].map((city) => (
              <div
                key={city.id}
                onClick={() => onCitySelect(city.id)}
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
