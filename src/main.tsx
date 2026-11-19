import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import App from "./App";
import { ThemeModeProvider } from "./components/ThemeMode";
// Registers the install listener before anything renders (see src/pwa.ts).
import "./pwa";
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
