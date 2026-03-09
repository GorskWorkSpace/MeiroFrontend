import styles from "./Caption.module.css";

interface CaptionProps {
  children: React.ReactNode;
  size?: number;
  weight?: 400 | 500 | 600 | 700 | 800 | 900;
  className?: string;
}

export const Caption = ({
  children,
  size = 12,
  weight = 500,
  className,
}: CaptionProps) => {
  return (
    <p
      style={{ fontSize: size, fontWeight: weight }}
      className={`${styles.font} ${className || ""}`}
    >
      {children}
    </p>
  );
};
