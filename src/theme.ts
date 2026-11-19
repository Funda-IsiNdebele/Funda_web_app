import { defineTheme } from "@astryxdesign/core/theme";
import { defaultThemeSlug, themes } from "./astryx-themes";

/**
 * Astryx "stone" theme (warm and earthy), re-tinted with the Ndebele palette.
 * Tokens are [light, dark] pairs. The body is transparent so the geometric
 * background pattern from styles.css shows through.
 */
export const fundaTheme = defineTheme({
  extends: themes[defaultThemeSlug],
  name: "funda",
  tokens: {
    "--color-accent": ["#B5532F", "#E58A63"],
    "--color-text-primary": ["#1F2A44", "#F3EEE2"],
    "--color-background-body": "transparent",
    "--color-background-surface": ["#FFFFFF", "#1E2740"],
    "--radius-container": "14px",
  },
});
