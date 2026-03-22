import styles from "./Tab.module.css";

interface TabProps {
  onClick?: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

export const Tab = ({ onClick, isActive, children }: TabProps) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.container} ${isActive ? styles.active : styles.inactive} `}
    >
      {children}
    </div>
  );
};
