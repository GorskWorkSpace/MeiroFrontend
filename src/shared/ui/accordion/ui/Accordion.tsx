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

export const Accordion = ({
  title,
  children,
  type,
  isOpen: externalIsOpen,
  onToggle,
}: AccordionProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

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
      <div className={styles.title}>
        <Title size={14} weight={500}>
          {title}
        </Title>
        <ArrowTopIcon
          onClick={toggleAccordion}
          style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
        />
      </div>
      {isOpen && (
        <div className={`${styles.content} ${styles[type]}`}>{children}</div>
      )}
    </div>
  );
};
