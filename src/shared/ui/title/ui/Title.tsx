import styles from "./Title.module.css";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  weight?: 400 | 500 | 600 | 700 | 800 | 900;
}

export const Title = ({ children, className, size, weight }: TitleProps) => {
  return (
    <p
      style={{ fontSize: size, fontWeight: weight }}
      className={`${styles.font} ${className || ""}`}
    >
      {children}
    </p>
  );
};
