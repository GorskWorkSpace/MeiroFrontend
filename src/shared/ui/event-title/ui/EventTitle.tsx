import styles from "./EventTitle.module.css";

interface EventTitleProps {
  text: string;
}

export const EventTitle = ({ text }: EventTitleProps) => {
  return <p className={styles.font}>{text}</p>;
};
