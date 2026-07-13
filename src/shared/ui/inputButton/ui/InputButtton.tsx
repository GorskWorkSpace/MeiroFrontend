import styles from "./InputButtton.module.css";

interface InputBtnProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const InputBtn = ({ children, onClick }: InputBtnProps) => {
  return (
    <button className={styles.InputBtn} onClick={onClick}>
      {children}
    </button>
  );
};
