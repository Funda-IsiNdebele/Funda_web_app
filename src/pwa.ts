/**
 * Install support for the Progressive Web App.
 *
 * Chrome/Edge/Android fire `beforeinstallprompt` once, shortly after the page loads.
 * This module is imported from main.tsx so the listener exists before any screen
 * renders; otherwise the event is missed (the app opens on /welcome, not /home).
 */

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export type InstallPlatform = "ios" | "android" | "desktop";

interface InstallState {
  /** The saved browser prompt, when one-tap install is possible. */
  prompt: BeforeInstallPromptEvent | null;
  /** Already running as an installed app. */
  installed: boolean;
}

const isStandalone = () =>
  window.matchMedia?.("(display-mode: standalone)").matches ||
  // iOS Safari
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

let state: InstallState = { prompt: null, installed: isStandalone() };
const listeners = new Set<() => void>();

function set(next: Partial<InstallState>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); // keep it for our own button instead of the browser's mini-bar
  set({ prompt: e as BeforeInstallPromptEvent });
});

window.addEventListener("appinstalled", () => set({ prompt: null, installed: true }));

window.matchMedia?.("(display-mode: standalone)").addEventListener?.("change", (e) => {
  if (e.matches) set({ installed: true });
});

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const getInstallState = () => state;

/** Shows the browser's install dialog. Returns false if it isn't available. */
export async function promptInstall(): Promise<"accepted" | "dismissed" | "unavailable"> {
  const p = state.prompt;
  if (!p) return "unavailable";
  await p.prompt();
  const { outcome } = await p.userChoice;
  // A prompt can only be used once.
  set({ prompt: null, installed: outcome === "accepted" || state.installed });
  return outcome;
}

export function detectPlatform(): InstallPlatform {
  const ua = navigator.userAgent;
  const iPadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/i.test(ua) || iPadOS) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}
