import styles from "./Title.module.css";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  weight?: 400 | 500 | 600 | 700 | 800 | 900;
  variant?: "" | "accent";
}

export const Title = ({
  children,
  className,
  size,
  weight,
  variant = "",
}: TitleProps) => {
  return (
    <h1
      style={{ fontSize: size, fontWeight: weight }}
      className={`${styles.font} ${styles[variant] || ""} ${className}`.trim()}
    >
      {children}
    </h1>
  );
};
