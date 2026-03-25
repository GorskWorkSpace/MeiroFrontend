import { useEffect, useState } from "react";
import styles from "./ChangeTheme.module.css";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
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
