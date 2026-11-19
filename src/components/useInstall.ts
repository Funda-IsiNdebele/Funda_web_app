import { useSyncExternalStore } from "react";
import { getInstallState, promptInstall, subscribe } from "../pwa";

/** Install state for components. The listener itself lives in src/pwa.ts. */
export function useInstall() {
  const { prompt, installed } = useSyncExternalStore(subscribe, getInstallState);
  return {
    /** One-tap install is available (Chrome, Edge, Android). */
    canInstall: prompt !== null,
    /** Already running as an installed app, so there's nothing to install. */
    installed,
    install: promptInstall,
  };
}
