/** Public address of the web app, added to everything people share. */
export const WEB_APP_URL = "https://funda-web-app.vercel.app/welcome";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.epakameni.funda&hl=en_GB";

/** Footer appended to shared content so people who receive it can open the app. */
export const SHARE_FOOTER = `Learn IsiNdebele with Funda: ${WEB_APP_URL}`;

export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

export interface ShareOptions {
  /** Where the web app link goes. Defaults to the bottom. */
  linkPosition?: "top" | "bottom";
  /**
   * Repeat the title inside the shared text. Many apps (WhatsApp, SMS) ignore the
   * share sheet's title, so without this the recipient never sees it.
   */
  includeTitle?: boolean;
}

/**
 * Shares text through the device share sheet, or copies it to the clipboard when
 * sharing isn't available. The web app link is always included.
 */
export async function shareText(
  title: string,
  body: string,
  { linkPosition = "bottom", includeTitle = false }: ShareOptions = {},
): Promise<ShareResult> {
  const content = [includeTitle ? title : "", body].filter(Boolean).join("\n\n");
  const parts = linkPosition === "top" ? [SHARE_FOOTER, content] : [content, SHARE_FOOTER];
  const text = parts.filter(Boolean).join("\n\n");

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
    // The clipboard has no separate title, so make sure it is in the text.
    const copied = includeTitle || linkPosition === "top" ? text : `${title}\n\n${text}`;
    await navigator.clipboard.writeText(copied);
    return "copied";
  } catch {
    return "failed";
  }
}
