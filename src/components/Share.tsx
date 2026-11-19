import { useState } from "react";
import { Button } from "@astryxdesign/core/Button";
import { shareText } from "../share";

/** Shares like the surname page: web app link first, then the title, then the content. */
function useShare() {
  const [status, setStatus] = useState("");

  async function share(title: string, body: string) {
    const result = await shareText(title, body, { linkPosition: "top", includeTitle: true });
    if (result === "copied") setStatus("Copied to clipboard");
    else if (result === "failed") setStatus("Couldn't share or copy");
    else return;
    setTimeout(() => setStatus(""), 2000);
  }

  const toast = status ? <div className="toast">{status}</div> : null;
  return { share, toast };
}

/** Lines like "kuNye – One - 1" for a list of words. */
export function formatPairs(items: { nd: string; en?: string }[]): string {
  return items.map((p) => (p.en ? `${p.nd} – ${p.en}` : p.nd)).join("\n");
}

/** Floating Share button in the bottom-right corner, as on the surname page. */
export function ShareFab({
  title,
  body,
  label = "Share",
}: {
  title: string;
  /** Text to share, or a function so it's built only when pressed. */
  body: string | (() => string);
  label?: string;
}) {
  const { share, toast } = useShare();
  return (
    <>
      <div className="fab">
        <Button
          label={label}
          variant="primary"
          elevation="high"
          onClick={() => share(title, typeof body === "function" ? body() : body)}
        />
      </div>
      {toast}
    </>
  );
}

/** Small inline Share link for a single item in a list. */
export function ShareLink({ title, body }: { title: string; body: string }) {
  const { share, toast } = useShare();
  return (
    <>
      <button className="share-link" onClick={() => share(title, body)}>
        Share
      </button>
      {toast}
    </>
  );
}
