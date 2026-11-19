import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ShareFab } from "../components/Share";
import type { ImageViewState } from "../types";

export default function ImageView() {
  const state = useLocation().state as ImageViewState | null;
  const navigate = useNavigate();
  if (!state) return <Navigate to="/home" replace />;

  return (
    <div className="image-view">
      <button className="icon-btn floating" aria-label="Back" onClick={() => navigate(-1)}>
        ←
      </button>
      <img src={state.image} alt={state.title} />
      <div className="caption">
        <span className="caption-nd">{state.subtitle}</span>
        {state.title && <span className="caption-en">{state.title}</span>}
      </div>
      <ShareFab
        title={state.subtitle}
        body={state.title ? `${state.subtitle} – ${state.title}` : state.subtitle}
      />
    </div>
  );
}
