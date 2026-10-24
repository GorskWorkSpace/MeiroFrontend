import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./globals.css";
import { InitialProjectProvider } from "./providers/InitialProject.tsx";
import { StoreProvider } from "./providers/StoreProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <ThemeProvider>
        <InitialProjectProvider>
          <App />
        </InitialProjectProvider>
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>,
);
