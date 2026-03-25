// features/theme-switcher/ui/ThemeSwitcher.tsx
import { useState, useEffect } from "react";
import styles from "./ChangeTheme.module.css";

export const ThemeSwitcher = () => {
  // Читаем сохранённую тему или используем системную
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    // Применяем тему к корневому элементу
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} className={styles.switcher}>
      {theme === "light" ? "🌙" : "☀️"}
      <span>{theme === "light" ? "Тёмная тема" : "Светлая тема"}</span>
    </button>
  );
};
