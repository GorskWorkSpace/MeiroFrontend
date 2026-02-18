import styles from "./Caption.module.css";

interface CaptionProps {
  children: React.ReactNode;
}

export const Caption = ({ children }: CaptionProps) => {
  return <p className={styles.font}>{children}</p>;
};
