import styles from "../CategoryInfo.module.css";

interface CategoryInfoProps {
  label: "Юмор" | "Спектакль" | "Концерт" | "Литература";
}

export const CategoryInfo = ({ label }: CategoryInfoProps) => {
  return (
    <div className={styles.categoryContainer}>
      <span className={styles.font}>{label}</span>
    </div>
  );
};
