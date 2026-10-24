import { cn } from "../../../lib/classNames";
import styles from "./Tab.module.css";

interface TabProps {
  onClick?: () => void;
  isActive: boolean;
  children: React.ReactNode;
  variant: "accent" | "usual";
}

export const Tab = ({ onClick, isActive, children, variant }: TabProps) => {
  const variantClass =
    variant === "usual"
      ? styles.usual
      : isActive
        ? styles.active
        : styles.inactive;

  return (
    <div onClick={onClick} className={cn(styles.container, variantClass)}>
      {children}
    </div>
  );
};
