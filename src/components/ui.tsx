import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@astryxdesign/core/Card";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { HStack } from "@astryxdesign/core/HStack";
import { Heading } from "@astryxdesign/core/Heading";
import { Icon } from "@astryxdesign/core/Icon";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@astryxdesign/core/SegmentedControl";
import { Spinner as AxSpinner } from "@astryxdesign/core/Spinner";
import { StackItem } from "@astryxdesign/core/Stack";
import { Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";
import { ThemeToggle } from "./ThemeMode";

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<{
    loading: boolean;
    error: boolean;
    data: T | null;
  }>({ loading: true, error: false, data: null });

  useEffect(() => {
    let alive = true;
    setState({ loading: true, error: false, data: null });
    fn()
      .then((data) => alive && setState({ loading: false, error: false, data }))
      .catch(() => alive && setState({ loading: false, error: true, data: null }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

const accent = (color: string): CSSProperties =>
  ({ "--accent": color }) as CSSProperties;

export function Screen({
  title,
  color,
  children,
  right,
  noBack,
}: {
  title: string;
  color: string;
  children: ReactNode;
  /** @deprecated kept for call-site compatibility; the body background is now themed. */
  bodyBg?: string;
  right?: ReactNode;
  noBack?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <div className="screen" style={accent(color)}>
      <header className="appbar">
        {!noBack && (
          <button className="icon-btn" aria-label="Back" onClick={() => navigate(-1)}>
            <Icon icon="chevronLeft" />
          </button>
        )}
        <h1>{title}</h1>
        {right}
        <ThemeToggle />
        <button className="icon-btn" aria-label="Home" onClick={() => navigate("/home")}>
          🏠
        </button>
      </header>
      <main className="content">{children}</main>
    </div>
  );
}

export function Spinner(_props: { color?: string }) {
  return (
    <div className="center">
      <AxSpinner size="xl" label="Loading..." />
    </div>
  );
}

export function ErrorMessage() {
  return (
    <div className="center">
      <EmptyState
        title="Internet Connection Error."
        description="Check your connection and try again."
      />
    </div>
  );
}

export function Tabs({
  tabs,
}: {
  tabs: { label: string; hint?: string; content: ReactNode }[];
  color?: string;
}) {
  const [active, setActive] = useState(tabs[0].label);
  const current = tabs.find((t) => t.label === active) ?? tabs[0];
  return (
    <div>
      <div className="tabs">
        {tabs.some((t) => t.hint) ? (
          // Two-line tabs (English + IsiNdebele); Astryx segments only take one-line labels.
          <div className="tab-bar" role="tablist" aria-label="Sections">
            {tabs.map((t) => (
              <button
                key={t.label}
                role="tab"
                aria-selected={t.label === current.label}
                className={t.label === current.label ? "tab2 active" : "tab2"}
                onClick={() => setActive(t.label)}
              >
                <span className="tab2-label">{t.label}</span>
                {t.hint && <span className="tab2-hint">{t.hint}</span>}
              </button>
            ))}
          </div>
        ) : (
          <SegmentedControl
            label="Sections"
            layout="fill"
            value={active}
            onChange={setActive}
          >
            {tabs.map((t) => (
              <SegmentedControlItem key={t.label} value={t.label} label={t.label} />
            ))}
          </SegmentedControl>
        )}
      </div>
      <div>{current.content}</div>
    </div>
  );
}

export function MenuCard({
  to,
  state,
  image,
  title,
  subtitle,
}: {
  to: string;
  state?: unknown;
  image?: string;
  title: string;
  subtitle?: string;
  titleColor?: string;
}) {
  const navigate = useNavigate();
  return (
    <ClickableCard
      label={subtitle ? `${title}, ${subtitle}` : title}
      onClick={() => navigate(to, { state })}
      padding={3}
      elevation="low"
    >
      <HStack gap={3} vAlign="center">
        {image && (
          <span className="menu-icon">
            <img src={image} alt="" />
          </span>
        )}
        <StackItem size="fill">
          <VStack gap={0.5}>
            <Heading level={4}>{title}</Heading>
            {subtitle && <Text type="supporting">{subtitle}</Text>}
          </VStack>
        </StackItem>
        <Icon icon="chevronRight" />
      </HStack>
    </ClickableCard>
  );
}

export function MenuGrid({ children }: { children: ReactNode }) {
  return <div className="card-grid">{children}</div>;
}

export function PairList({ items }: { items: { nd: string; en?: string; image?: string }[] }) {
  return (
    <div className="card-grid">
      {items.map((p, i) => (
        <Card key={`${p.nd}-${i}`} padding={3}>
          <HStack gap={3} vAlign="center">
            {p.image ? (
              <img className="menu-icon big" src={p.image} alt="" />
            ) : (
              <span className="badge">{i + 1}</span>
            )}
            <StackItem size="fill">
              <VStack gap={0.5}>
                <Heading level={4}>{p.nd}</Heading>
                {p.en && <Text type="supporting">{p.en}</Text>}
              </VStack>
            </StackItem>
          </HStack>
        </Card>
      ))}
    </div>
  );
}

export function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="search">
      <TextInput
        type="search"
        label="Search"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        width="100%"
      />
    </div>
  );
}
