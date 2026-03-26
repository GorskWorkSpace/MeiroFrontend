import styles from "./Footer.module.css";

interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

export const Footer = ({ children, className }: FooterProps) => {
  return (
    <footer className={`${styles.footerWrapper}`}>
      <div className={`${styles.content} ${className}`}>{children}</div>
    </footer>
  );
};
