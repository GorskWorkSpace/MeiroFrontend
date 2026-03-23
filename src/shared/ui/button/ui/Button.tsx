import styles from "./Button.module.css";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <div className={`${styles.container} `}>
      <button
        className={`${styles.label} ${className || ""}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};