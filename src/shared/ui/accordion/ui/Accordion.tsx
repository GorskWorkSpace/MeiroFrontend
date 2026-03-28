import { useState } from "react";
import { ArrowTopIcon } from "../../../assets";
import { Title } from "../../title";
import styles from "./Accordion.module.css";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  type: "usual" | "grid" | "row";
  isOpen?: boolean;
  onToggle?: () => void;
}

// Альтернативный вариант с использованием transform scaleY
export const Accordion = ({
  title,
  children,
  type,
  isOpen: externalIsOpen,
  onToggle,
}: AccordionProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const toggleAccordion = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title} onClick={toggleAccordion}>
        <Title size={14} weight={500}>
          {title}
        </Title>
        <ArrowTopIcon
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(90deg)",
            transition: "all 0.4s linear",
          }}
        />
      </div>
      <div className={`${styles.contentWrapper} ${isOpen ? styles.open : ""}`}>
        <div className={`${styles.content} ${styles[type]}`}>{children}</div>
      </div>
    </div>
  );
};
