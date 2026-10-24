import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext, type Theme } from "../../shared/lib/theme";

const THEME_KEY = "theme";
const THEME_COLORS: Record<Theme, string> = {
  light: "#ffffff",
  dark: "#14181f",
};

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const updateThemeColor = (color: string) => {
  const metas = document.querySelectorAll('meta[name="theme-color"]');

  if (metas.length > 0) {
    metas.forEach((meta) => meta.setAttribute("content", color));
    return;
  }

  const meta = document.createElement("meta");
  meta.setAttribute("name", "theme-color");
  meta.setAttribute("content", color);
  document.head.appendChild(meta);
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    updateThemeColor(THEME_COLORS[theme]);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
