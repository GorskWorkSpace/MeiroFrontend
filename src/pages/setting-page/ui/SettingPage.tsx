import { Menu } from "../../../features/menu/ui/Menu";
import { ArrowLeft } from "../../../shared/assets/icons/ArrowLeft";
import { Switcher } from "../../../shared/ui/switcher";
import styles from "./SettingPage.module.css";

export const SettingPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <ArrowLeft color="#BEC9DA" size="24" />
          <p className={styles.logo}>MEIRO</p>
        </div>
        <h2 className={styles.title}>Настройки</h2>
        <div className={styles.content}>
          <div className={styles.switchContainer}>
            <p>Темная тема</p>
            <Switcher />
          </div>
          <div className={styles.switchContainer}>
            <p>Получать уведомления</p>
            <Switcher />
          </div>
          <p className={styles.textSecondary}>
            Не пропустите важное: напомним о скорых событиях и покажем новые
            мероприятия по вашим интересам
          </p>
        </div>
        <div className={styles.footer}>
          <Menu />
        </div>
      </div>
    </>
  );
};
