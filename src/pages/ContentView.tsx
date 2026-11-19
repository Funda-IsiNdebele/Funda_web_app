import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getContent } from "../api";
import { colors } from "../colors";
import { formatPairs, ShareFab } from "../components/Share";
import { ErrorMessage, Screen, SearchBox, Spinner, useAsync } from "../components/ui";
import type { ImageViewState } from "../types";

export default function ContentView() {
  const { base = "", category = "" } = useParams();
  const { loading, error, data } = useAsync(() => getContent(`${base}/`, category), [base, category]);
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (d) => d.nameE.toLowerCase().includes(q) || d.nameNd.toLowerCase().includes(q),
    );
  }, [data, query]);

  return (
    <Screen title={category.toUpperCase()} color={colors.blueGrey}>
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <ErrorMessage />
      ) : (
        <>
          <SearchBox value={query} onChange={setQuery} />
          <ul className="plain-list">
            {rows.map((d, i) => {
              const state: ImageViewState = {
                title: d.nameE,
                subtitle: d.nameNd,
                image: d.image,
              };
              return (
                <li key={`${d.nameNd}-${i}`}>
                  <Link to="/image" state={state} className="row row-link">
                    <img className="thumb" src={d.image} alt="" loading="lazy" />
                    <div className="row-text">
                      <div className="row-title">{d.nameNd}</div>
                      <div className="row-sub">{d.nameE}</div>
                    </div>
                    <span className="chev">›</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ShareFab
            title={category}
            body={() => formatPairs(rows.map((d) => ({ nd: d.nameNd, en: d.nameE })))}
          />
        </>
      )}
    </Screen>
  );
}
