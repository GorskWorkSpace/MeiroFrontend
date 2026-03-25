import { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setTheme } from "../../entities/theme";
import type { AppDispatch } from "../store/store";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (
      e: MediaQueryListEvent | MediaQueryList,
    ) => {
      dispatch(setTheme(e.matches ? "dark" : "light"));
    };

    handleSystemThemeChange(mediaQuery);

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [dispatch]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
};
