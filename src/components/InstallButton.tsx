import { useEffect, useState } from "react";
import { Button } from "@astryxdesign/core/Button";
import { detectPlatform } from "../pwa";
import { useInstall } from "./useInstall";

const STEPS: Record<"ios" | "android" | "desktop", { title: string; steps: string[] }> = {
  ios: {
    title: "Install on iPhone or iPad",
    steps: [
      "Open this page in Safari.",
      "Tap the Share button (the square with an arrow).",
      "Scroll down and tap “Add to Home Screen”.",
      "Tap “Add”.",
    ],
  },
  android: {
    title: "Install on Android",
    steps: [
      "Open this page in Chrome.",
      "Tap the ⋮ menu in the top-right corner.",
      "Tap “Install app” or “Add to Home screen”.",
    ],
  },
  desktop: {
    title: "Install on your computer",
    steps: [
      "Open this page in Chrome or Edge.",
      "Click the install icon at the right end of the address bar, or open the ⋮ menu.",
      "Choose “Install Funda IsiNdebele”.",
    ],
  },
};

/**
 * "Install app" button for the top of a page. Uses the browser's one-tap install
 * when available; otherwise shows step-by-step instructions for the device.
 * Hidden when the app is already installed.
 */
export default function InstallButton() {
  const { canInstall, installed, install } = useInstall();
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    if (!helpOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setHelpOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [helpOpen]);

  if (installed) return null;

  async function onClick() {
    if (canInstall) {
      const result = await install();
      if (result !== "unavailable") return;
    }
    setHelpOpen(true);
  }

  const help = STEPS[detectPlatform()];

  return (
    <>
      <Button label="Install app" variant="primary" size="sm" onClick={onClick} />
      {helpOpen && (
        <div className="install-help-scrim" onClick={() => setHelpOpen(false)}>
          <div
            className="install-help"
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-help-title"
            onClick={(e) => e.stopPropagation()}
          >
            <img className="install-help-icon" src="/icon-192.png" alt="" />
            <h2 id="install-help-title">{help.title}</h2>
            <ol>
              {help.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="install-help-note">
              Once installed, Funda opens from your home screen like any other app and works offline.
            </p>
            <Button label="Got it" variant="primary" onClick={() => setHelpOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
