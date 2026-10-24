import { cn } from "../../../lib/classNames";
import { useIsDesktop } from "../../../lib/hooks/useIsDesktop";
import styles from "./Caption.module.css";

interface CaptionProps {
  children: React.ReactNode;
  weight?: 400 | 500 | 600 | 700 | 800 | 900;
  className?: string;
  variant?: "usual" | "accent";
}

export const Caption = ({
  children,
  weight = 500,
  className,
  variant = "usual",
}: CaptionProps) => {
  const isDesktop = useIsDesktop();

  return (
    <p
      style={{ fontSize: isDesktop ? 14 : 12, fontWeight: weight }}
      className={cn(styles.font, styles[variant], className)}
    >
      {children}
    </p>
  );
};
