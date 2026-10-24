import { cn } from "../../../lib/classNames";
import styles from "./Footer.module.css";

interface FooterProps {
  children: React.ReactNode;
  className?: string;
  classFoot?: "footerWrapper" | "filterFooter";
}

export const Footer = ({
  children,
  className,
  classFoot = "footerWrapper",
}: FooterProps) => {
  return (
    <footer className={styles[classFoot]}>
      <div className={cn(styles.content, className)}>{children}</div>
    </footer>
  );
};
