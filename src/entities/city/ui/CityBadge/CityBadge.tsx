import styles from "./CityBadge.module.css";

interface CityBadgeProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const CityBadge = ({ children, onClick }: CityBadgeProps) => {
  return (
    <div onClick={onClick} className={styles.city}>
      {children}
    </div>
  );
};
