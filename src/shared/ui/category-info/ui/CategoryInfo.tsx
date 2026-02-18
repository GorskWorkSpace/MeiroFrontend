import styles from "./CategoryInfo.module.css";

interface CategoryInfoProps {
  children: React.ReactNode
}

export const CategoryInfo = ({ children }: CategoryInfoProps) => {
  return (
    <div className={styles.categoryContainer}>
      <p className={styles.font}>{children}</p>
    </div>
  );
};
