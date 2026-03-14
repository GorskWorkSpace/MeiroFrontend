import styles from "./CityListSkeleton.module.css";

export const CityListSkeleton = () => {
  const letters = ["А", "Б", "В", "Г", "Д"];

  return (
    <div className={`${styles.container}`}>
      {letters.map((letter, index) => (
        <div key={index} className={styles.listContainer}>
          <div className={styles.letter}>{letter}</div>
          <div className={styles.citiesList}>
            {[...Array(3)].map((_, cityIndex) => (
              <div key={cityIndex} className={styles.skeletonCity} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
