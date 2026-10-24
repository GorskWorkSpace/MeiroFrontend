import { cn } from "../../../lib/classNames";
import styles from "./Title.module.css";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  weight?: 400 | 500 | 600 | 700 | 800 | 900;
  variant?: "" | "accent";
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Title = ({
  children,
  className,
  size,
  weight,
  variant = "",
  style,
  onClick,
}: TitleProps) => {
  return (
    <h1
      style={{ fontSize: size, fontWeight: weight, ...style }}
      className={cn(styles.font, variant && styles[variant], className)}
      onClick={onClick}
    >
      {children}
    </h1>
  );
};
