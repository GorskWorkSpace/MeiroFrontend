import { LoginInput } from "../../../shared/ui/input/ui/LoginInput/LoginInput";
import { Modal } from "../../../shared/ui/modal";
import styles from "./login.module.css";
import { useState } from "react";

export const LoginMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Вход">
      <div className={styles.content}>
        <div className={styles.inputscont}>
          <LoginInput placeholder="Телефон или email" />
        </div>
      </div>
    </Modal>
  );
};
