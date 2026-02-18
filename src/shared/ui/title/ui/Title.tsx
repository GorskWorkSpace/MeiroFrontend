import styles from "./Title.module.css";

interface TitleProps {
  children: React.ReactNode;
}

export const Title = ({ children }: TitleProps) => {
  return <p className={styles.font}>{children}</p>;
};
