import styles from "./CategoryInfo.module.css";

interface CategoryInfoProps {
  label: "Юмор" | "Спектакль" | "Концерт" | "Литература";
}

export const CategoryInfo = ({ label }: CategoryInfoProps) => {
  return (
    <div className={styles.categoryContainer}>
      <p className={styles.font}>{label}</p>
    </div>
  );
};
