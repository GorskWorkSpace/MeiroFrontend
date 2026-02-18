import styles from "./Title.module.css";

interface TitleProps {
  title: "Мероприятия для вас";
}

export const Title = ({ title }: TitleProps) => {
  return <p className={styles.font}>{title}</p>;
};
