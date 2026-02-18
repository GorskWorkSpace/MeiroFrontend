import styles from "./EventTitle.module.css";

interface EventTitleProps {
  children: React.ReactNode;
}

export const EventTitle = ({ children }: EventTitleProps) => {
  return <p className={styles.font}>{children}</p>;
};
