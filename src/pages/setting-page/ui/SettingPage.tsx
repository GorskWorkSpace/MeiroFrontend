import { Menu } from "../../../features/menu";
import { useTheme } from "../../../shared/lib/theme";
import { ArrowBack } from "../../../shared/ui/arrow-back";
import { Seo } from "../../../shared/ui/seo";
import { Switcher } from "../../../shared/ui/switcher";
import { Title } from "../../../shared/ui/title";
import styles from "./SettingPage.module.css";

export const SettingPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Seo title="Настройки" description="Настройки" />
      <div className={styles.container}>
        <div className={styles.header}>
          <ArrowBack color="#BEC9DA" size="24" />
          <p className={styles.logo}>MEIRO</p>
        </div>
        <Title className={styles.title}>Настройки</Title>
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.switchContainer}>
              <p className={styles.label}>Темная тема</p>
              <Switcher isActive={theme === "dark"} onToggle={toggleTheme} />
            </div>
            <p className={styles.textSecondary}>
              Не пропустите важное: напомним о скорых событиях и покажем новые
              мероприятия по вашим интересам
            </p>
          </div>
        </div>
        <div className={styles.footer}>
          <Menu />
        </div>
      </div>
    </>
  );
};
