import styles from "./Caption.module.css";

interface CaptionProps {
  text: string;
}

export const Caption = ({ text }: CaptionProps) => {
  return <p className={styles.font}>{text}</p>;
};
