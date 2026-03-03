import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./App.tsx";
import { StoreProvider } from "./providers/StoreProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>,
);

