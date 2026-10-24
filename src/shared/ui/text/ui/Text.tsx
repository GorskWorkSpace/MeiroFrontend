import { cn } from "../../../lib/classNames";
import styles from "./Text.module.css";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  size: number;
  weight: 400 | 500 | 600 | 700 | 800 | 900;
  textColor?: string;
}

export const Text = ({
  children,
  className,
  size,
  weight,
  textColor,
}: TextProps) => {
  return (
    <p
      style={{ fontSize: size, fontWeight: weight, color: textColor }}
      className={cn(styles.font, className)}
    >
      {children}
    </p>
  );
};
