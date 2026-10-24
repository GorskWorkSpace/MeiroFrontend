import styles from "./CityListSkeleton.module.css";

const SKELETON_LETTERS = ["А", "Б", "В", "Г", "Д"];
const CITIES_PER_LETTER = 3;

export const CityListSkeleton = () => {
  return (
    <div className={styles.container}>
      {SKELETON_LETTERS.map((letter) => (
        <div key={letter} className={styles.listContainer}>
          <div className={styles.letter}>{letter}</div>
          <div className={styles.citiesList}>
            {Array.from({ length: CITIES_PER_LETTER }, (_, index) => (
              <div key={index} className={styles.skeletonCity} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
