/** Public address of the web app, added to everything people share. */
export const WEB_APP_URL = "https://funda-web-app.vercel.app/welcome";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.epakameni.funda&hl=en_GB";

/** Footer appended to shared content so people who receive it can open the app. */
export const SHARE_FOOTER = `Learn IsiNdebele with Funda: ${WEB_APP_URL}`;

export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

/**
 * Shares text through the device share sheet, or copies it to the clipboard when
 * sharing isn't available. The web app link is always included.
 */
export async function shareText(title: string, body: string): Promise<ShareResult> {
  const text = body ? `${body}\n\n${SHARE_FOOTER}` : SHARE_FOOTER;

  if (navigator.share) {
    try {
      // The link is already in `text`; passing `url` too makes some apps show it twice.
      await navigator.share({ title, text });
      return "shared";
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return "cancelled";
      // Fall through to copying (e.g. share not allowed in this context).
    }
  }

  try {
    await navigator.clipboard.writeText(`${title}\n\n${text}`);
    return "copied";
  } catch {
    return "failed";
  }
}
