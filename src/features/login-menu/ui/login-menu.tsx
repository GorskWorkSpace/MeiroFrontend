import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { LoginInput } from "../../../shared/ui/input/ui/LoginInput/LoginInput";
import { Modal } from "../../../shared/ui/modal";
import styles from "./login.module.css";
import { useState } from "react";
import { Button } from "../../../shared/ui/button";

export const LoginMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => {
    navigate("/");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Вход">
      <div className={styles.content}>
        <div className={styles.inputCont}>
          <LoginInput placeholder="Телефон или email" type="text" />
          <LoginInput placeholder="Пароль" type="password" />
        </div>
        <NavLink to="#" className={styles.forgotPass}>
          <p>Забыли пароль?</p>
        </NavLink>
        <NavLink to="#">
          <p>Нет профиля? Зарегестрироваться</p>
        </NavLink>
      </div>
      <div className={styles.entryBtn}>
        <Button onClick={() => {}}>
          <p>Войти</p>
        </Button>
      </div>
    </Modal>
  );
};
