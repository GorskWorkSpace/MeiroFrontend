import styles from "./Caption.module.css";
import { useMediaQuery } from "../../../lib/hooks/useMediaQuery";

interface CaptionProps {
  children: React.ReactNode;
  size?: number;
  weight?: 400 | 500 | 600 | 700 | 800 | 900;
  className?: string;
  variant?: "usual" | "accent";
}

export const Caption = ({
  children,
  size,
  weight = 500,
  className,
  variant = "usual",
}: CaptionProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <p
      style={{ fontSize: (size = isDesktop ? 14 : 12), fontWeight: weight }}
      className={`${styles.font} ${styles[variant] || ""} ${className}`.trim()}
    >
      {children}
    </p>
  );
};
