import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  HeartIcon,
  MenuIcon,
  SettingsIcon,
} from "../../../shared/assets";
import { ROUTES } from "../../../shared/config/routes";
import { Modal } from "../../../shared/ui/modal";
import styles from "./Menu.module.css";

const SUPPORT_URL = "https://t.me/dayr1man";
const ICON_COLOR = "var(--text-main)";
const ICON_SIZE = "18";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        className={styles.iconWrapper}
        onClick={() => setIsOpen(true)}
        aria-label="Открыть меню"
      >
        <MenuIcon />
      </button>
      <Modal isOpen={isOpen} onClose={onClose} title="Меню">
        <div className={styles.content}>
          <Avatar />
          <nav className={styles.list}>
            <NavLink to={ROUTES.myEvents} className={styles.link}>
              <HeartIcon
                isFavourite={false}
                size={ICON_SIZE}
                color={ICON_COLOR}
              />
              <p>Избранное</p>
            </NavLink>

            <NavLink to={ROUTES.settings} className={styles.link}>
              <SettingsIcon color={ICON_COLOR} size={ICON_SIZE} />
              <p>Настройки</p>
            </NavLink>
          </nav>
          <div className={styles.footer}>
            <a href="#" className={styles.link}>
              Политика обработки персональных данных
            </a>
            <a href="#" className={styles.link}>
              Пользовательское соглашение
            </a>
            <a href={SUPPORT_URL} className={styles.link}>
              Поддержка
            </a>
            <p className={styles.anyText}> &copy; 2026</p>
          </div>
        </div>
      </Modal>
    </>
  );
};
