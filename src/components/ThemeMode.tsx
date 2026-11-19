import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Switch } from "@astryxdesign/core/Switch";
import { Theme } from "@astryxdesign/core/theme";
import { fundaTheme } from "../theme";

type Mode = "light" | "dark";

const STORAGE_KEY = "funda:theme";

interface ThemeModeValue {
  mode: Mode;
  setMode: (m: Mode) => void;
}

const ThemeModeContext = createContext<ThemeModeValue | null>(null);

function initialMode(): Mode {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Holds the light/dark choice, remembers it, and applies it to Astryx and to styles.css. */
export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(initialMode);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    localStorage.setItem(STORAGE_KEY, mode);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", mode === "dark" ? "#0F1526" : "#1F2A44");
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <Theme theme={fundaTheme} mode={mode}>
        {children}
      </Theme>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeModeValue {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode must be used inside ThemeModeProvider");
  return ctx;
}

/** Sun / switch / moon control for the header. */
export function ThemeToggle() {
  const { mode, setMode } = useThemeMode();
  return (
    <div className="theme-toggle">
      <span aria-hidden="true">☀️</span>
      <Switch
        label="Dark mode"
        isLabelHidden
        size="sm"
        value={mode === "dark"}
        onChange={(on) => setMode(on ? "dark" : "light")}
      />
      <span aria-hidden="true">🌙</span>
    </div>
  );
}
