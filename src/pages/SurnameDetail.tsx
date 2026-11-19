import { useState } from "react";
import { Button } from "@astryxdesign/core/Button";
import { Navigate, useLocation } from "react-router-dom";
import { colors } from "../colors";
import { Screen } from "../components/ui";
import { shareText } from "../share";
import type { SurnameDetailState } from "../types";

export default function SurnameDetail() {
  const state = useLocation().state as SurnameDetailState | null;
  const [status, setStatus] = useState("");
  if (!state) return <Navigate to="/surnames" replace />;

  async function share() {
    if (!state) return;
    const result = await shareText(state.title, state.desc);
    if (result === "copied") setStatus("Copied to clipboard");
    else if (result === "failed") setStatus("Couldn't share or copy");
    else return;
    setTimeout(() => setStatus(""), 2000);
  }

  return (
    <Screen title={state.title} color={colors.surname}>
      <p className="surname-desc">{state.desc}</p>
      <div className="fab">
        <Button label="Share" variant="primary" elevation="high" onClick={share} />
      </div>
      {status && <div className="toast">{status}</div>}
    </Screen>
  );
}
