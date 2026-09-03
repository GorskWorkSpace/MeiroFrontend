import { useState } from "react";
import { Modal } from "../../shared/ui/modal";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpMain.module.css";
import { Title } from "../../shared/ui/title";
import { LoginInput } from "../../shared/ui/input/ui/LoginInput/LoginInput";

export const SignUpMain = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => {
    navigate("/");
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Регистрация">
      <div className={styles.content}>
        <Title weight={500} size={20}>
          {" "}
          Шаг 1 из 4
        </Title>
        <div className={styles.inputCont}>
          <p style={{ fontSize: "14px" }}>Как вас зовут?</p>
        </div>
        <form action="#" method="POST" className={styles.inputForm}>
          <LoginInput placeholder="Имя" />
          <LoginInput placeholder="Фамилия" />
          <LoginInput placeholder="email" />
          <LoginInput placeholder="Телефон" />
        </form>
        <div className={styles.selfDateCont}>
          {/* <div className={styles.checkSelfDate}></div> */}
          <input type="checkbox" className={styles.checkSelfDate} />
          <p>
            Даю согласие на обработку персональных данных. С политикой защиты и
            обработки персональных данных ознакомлен(а)
          </p>
        </div>
      </div>
    </Modal>
  );
};
