import styles from "./Footer.module.css";

interface FooterProps {
  children: React.ReactNode;
}

export const Footer = ({ children }: FooterProps) => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.content}>{children}</div>
    </footer>
  );
};
