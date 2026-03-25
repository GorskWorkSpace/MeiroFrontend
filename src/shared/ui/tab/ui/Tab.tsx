import styles from "./Tab.module.css";

interface TabProps {
  onClick?: () => void;
  isActive: boolean;
  children: React.ReactNode;
  variant: "accent" | "usual";
}

export const Tab = ({ onClick, isActive, children, variant }: TabProps) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.container} ${
        variant === "accent"
          ? isActive
            ? styles.active
            : styles.inactive
          : styles.usual
      }`}
    >
      {children}
    </div>
  );
};
