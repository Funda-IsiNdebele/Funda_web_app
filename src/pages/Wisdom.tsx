import { useState } from "react";
import { Button } from "@astryxdesign/core/Button";
import { getWisdom } from "../api";
import { colors } from "../colors";
import { ShareLink } from "../components/Share";
import { ErrorMessage, Screen, Spinner, Tabs, useAsync } from "../components/ui";

/**
 * In the API data the `isindebele` field holds the proverb/idiom/riddle (the question)
 * and the `english` field holds its meaning or answer (also written in IsiNdebele).
 */
function WisdomList({ kind, title }: { kind: string; title: string }) {
  const { loading, error, data } = useAsync(() => getWisdom(kind), [kind]);
  const [shown, setShown] = useState<Set<number>>(new Set());

  if (loading) return <Spinner color={colors.wisdom} />;
  if (error || !data) return <ErrorMessage />;
  if (data.length === 0) {
    return <p className="wisdom-empty">Nothing here yet.</p>;
  }

  const allShown = shown.size === data.length;
  const toggle = (i: number) =>
    setShown((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <>
      <div className="wisdom-toolbar">
        <Button
          label={allShown ? "Hide all answers" : "Show all answers"}
          variant="ghost"
          size="sm"
          onClick={() => setShown(allShown ? new Set() : new Set(data.map((_, i) => i)))}
        />
      </div>
      <ul className="plain-list">
        {data.map((item, i) => {
          const open = shown.has(i);
          return (
            <li key={i} className="wisdom-item">
              <p className="wisdom-q">{item.nameNd}</p>
              {open && (
                <p className="wisdom-a" id={`${kind}-answer-${i}`}>
                  <span className="wisdom-label">Answer</span>
                  {item.nameE}
                </p>
              )}
              <div className="wisdom-actions">
                <button
                  className="wisdom-toggle"
                  aria-expanded={open}
                  aria-controls={`${kind}-answer-${i}`}
                  onClick={() => toggle(i)}
                >
                  {open ? "Hide answer ▴" : "Show answer ▾"}
                </button>
                <ShareLink title={title} body={`${item.nameNd}\n\nAnswer: ${item.nameE}`} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function Wisdom() {
  return (
    <Screen title="Wisdom" color={colors.wisdom}>
      <Tabs
        color={colors.wisdom}
        tabs={[
          {
            label: "Proverbs",
            hint: "Izaga",
            content: <WisdomList kind="proverbs" title="Isaga – Proverb" />,
          },
          {
            label: "Idioms",
            hint: "Izitjho",
            content: <WisdomList kind="idioms" title="Isitjho – Idiom" />,
          },
          {
            label: "Riddles",
            hint: "Inrarejo",
            content: <WisdomList kind="riddles" title="Isirarejo – Riddle" />,
          },
        ]}
      />
    </Screen>
  );
}
