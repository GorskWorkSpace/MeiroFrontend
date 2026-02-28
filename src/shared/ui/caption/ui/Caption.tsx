import styles from "./Caption.module.css";

interface CaptionProps {
  children: React.ReactNode;
  size: number;
  weight: 400 | 500 | 600 | 700 | 800 | 900;
}

export const Caption = ({ children, size, weight }: CaptionProps) => {
  return (
    <p style={{ fontSize: size, fontWeight: weight }} className={styles.font}>
      {children}
    </p>
  );
};
