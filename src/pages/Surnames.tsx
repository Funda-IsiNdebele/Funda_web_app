import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSubSurnames, getSurnames } from "../api";
import { colors } from "../colors";
import { ErrorMessage, Screen, SearchBox, Spinner, useAsync } from "../components/ui";
import type { Surname, SurnameDetailState } from "../types";

function SurnameRow({ s }: { s: Surname }) {
  const hasMore = s.sub === "more";
  const detail: SurnameDetailState = { title: s.surname, desc: s.sub };
  return (
    <li>
      <Link
        to={hasMore ? `/surnames/${encodeURIComponent(s.surname)}` : "/surname"}
        state={hasMore ? undefined : detail}
        className="card row-link"
      >
        <div className="row-text">
          <div className="row-title" style={{ color: colors.surname }}>
            {s.surname}
          </div>
          <div className="row-sub">{s.desc}</div>
        </div>
        <span className="chev">›</span>
      </Link>
    </li>
  );
}

export default function Surnames() {
  const { loading, error, data } = useAsync(getSurnames, []);
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (s) => s.surname.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q),
    );
  }, [data, query]);

  return (
    <Screen title="Imbongo" color={colors.surname}>
      {loading ? (
        <Spinner color={colors.surname} />
      ) : error || !data ? (
        <ErrorMessage />
      ) : (
        <>
          <SearchBox value={query} onChange={setQuery} />
          <ul className="plain-list padded">
            {rows.map((s, i) => (
              <SurnameRow key={`${s.surname}-${i}`} s={s} />
            ))}
          </ul>
        </>
      )}
    </Screen>
  );
}

export function SubSurnames() {
  const { clan = "" } = useParams();
  const { loading, error, data } = useAsync(() => getSubSurnames(clan), [clan]);

  return (
    <Screen title={clan} color={colors.surname}>
      {loading ? (
        <Spinner color={colors.surname} />
      ) : error || !data ? (
        <ErrorMessage />
      ) : (
        <ul className="plain-list">
          {data.map((s, i) => (
            <li key={`${s.surname}-${i}`}>
              <Link
                to="/surname"
                state={{ title: s.surname, desc: s.sub } satisfies SurnameDetailState}
                className="row row-link"
              >
                <div className="row-text">
                  <div className="row-title">{s.surname}</div>
                  <div className="row-sub">{s.desc}</div>
                </div>
                <span className="chev">›</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Screen>
  );
}
