import { Menu } from "../../../features/menu/ui/Menu";
import { Switcher } from "../../../shared/ui/switcher";
import styles from "./SettingPage.module.css";
import { useTheme } from "../../../features/theme-switcher/lib/useTheme";
import { ArrowBack } from "../../../shared/ui/arrow-back/arrow-back";
import { Title } from "../../../shared/ui/title";

export const SettingPage = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <ArrowBack color="#BEC9DA" size="24" />
          <p className={styles.logo}>MEIRO</p>
        </div>
        <Title className={styles.title}>Настройки</Title>
        <div className={styles.content}>
          <div className={styles.switchContainer}>
            <p>Темная тема</p>
            <Switcher isActive={theme === "dark"} onToggle={toggleTheme} />
          </div>
          {/* <div className={styles.switchContainer}>
            <p>Получать уведомления</p>
            <Switcher />
          </div> */}
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
