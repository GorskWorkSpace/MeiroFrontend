import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Modal.module.css";
import { CloseIcon } from "../../../assets/icons";
import { Title } from "../../title";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  component?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  component,
}) => {
  // Блокируем скролл body при открытой модалке
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.modal}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              damping: 30,
              stiffness: 300,
              duration: 0.4,
            }}
          >
            <div className={styles.wrapper}>
              <div className={styles.header}>
                <Title>{title}</Title>
                <button
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Закрыть"
                >
                  <CloseIcon color="#94A2B8" />
                </button>
              </div>
              {component}
            </div>

            <div className={styles.content}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
