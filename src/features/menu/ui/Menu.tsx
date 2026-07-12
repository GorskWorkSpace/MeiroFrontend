import { useState } from "react";
import {
  HeartIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
} from "../../../shared/assets";
import { Avatar } from "../../../shared/assets/icons/Avatar";
import { NavLink } from "react-router-dom";
import { Modal } from "../../../shared/ui/modal";
import styles from "./Menu.module.css";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className={styles.iconWrapper} onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </button>
      <Modal isOpen={isOpen} onClose={onClose} title="Mеню">
        <div className={styles.content}>
          <Avatar />
          <nav className={styles.list}>
            <NavLink to="/login" className={styles.link}>
              <UserIcon size="18" color="var(--text-main)" />
              <p>Профиль</p>
            </NavLink>

            <NavLink to="/event/my-events" className={styles.link}>
              <HeartIcon
                isFavourite={false}
                size="18"
                color="var(--text-main)"
              />
              <p>Избранное</p>
            </NavLink>

            <NavLink to="/settings" className={styles.link}>
              <SettingsIcon color="var(--text-main)" size="18" />
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
            <a href="https://t.me/da1ryman" className={styles.link}>
              Поддержка
            </a>
            <p className={styles.anyText}> &copy; 2026</p>
          </div>
        </div>
      </Modal>
    </>
  );
};
