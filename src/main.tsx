import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import App from "./App";
import { ThemeModeProvider } from "./components/ThemeMode";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeModeProvider>
  </StrictMode>,
);
