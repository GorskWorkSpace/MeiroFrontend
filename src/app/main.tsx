import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { StoreProvider } from "./providers/StoreProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { InitialProjectProvider } from "./providers/InitialProject.tsx";

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
