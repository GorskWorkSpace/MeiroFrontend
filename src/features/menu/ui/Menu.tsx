import {
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SettingsIcon,
} from "../../../shared/assets";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Menu.module.css";
import { Avatar } from "../../../shared/assets/icons/Avatar";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
  component?: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      <button className={styles.iconWrapper} onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.container}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ damping: 30, stiffness: 300, duration: 0.4 }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>Меню</h2>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
              >
                <CloseIcon color="#BEC9DA" />
              </button>
            </div>
            <div className={styles.content}>
              <Avatar />

              <nav className={styles.list}>
                <a href="#" className={styles.link}>
                  <HeartIcon
                    isFavourite={false}
                    size="18"
                    color="var(--text-main)"
                  />
                  <p> Избранное </p>
                </a>
                <a href="#" className={styles.link}>
                  <SettingsIcon color="var(--text-main)" size="18" />
                  <p>Настройки</p>
                </a>
              </nav>
              <div className={styles.footer}>
                <a href="#" className={styles.link}>
                  Политика обработки персональных данных
                </a>
                <a href="#" className={styles.link}>
                  Пользовательское соглашение
                </a>
                <a href="#" className={styles.link}>
                  Поддержка
                </a>
                <p className={styles.anyText}> &copy; 2026</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
