import { Navigate, useParams } from "react-router-dom";
import { getHistory, getKings } from "../api";
import { colors } from "../colors";
import {
  ErrorMessage,
  MenuCard,
  MenuGrid,
  PairList,
  Screen,
  Spinner,
  Tabs,
  useAsync,
} from "../components/ui";
import {
  abalobokazi,
  abantazana,
  abesegwabo,
  amasokana,
  intangaManala,
  intangaNzunza,
} from "../data/database";

const ITEMS = [
  { nd: "Indawa", en: "Places", image: "/img/indawo.png", to: "/history/view/Indawa-places/places" },
  { nd: "Imilambo", en: "Rivers", image: "/img/river.png", to: "/history/view/Imilambo-Rivers/rivers" },
  { nd: "Iingwenyama", en: "Ndebele Kings", image: "/img/king.png", to: "/history/kings" },
  { nd: "Iinkomo zobukhazi", en: "Lobola cows", image: "/img/cows.png", to: "/history/view/inkomo Zama lobolo/inkomoZamalobolo" },
  { nd: "Amabizo wabesegwabo", en: "Ndebele young boys names", image: "/img/nen.png", to: "/history/names/abesegwabo" },
  { nd: "Amabizo wabantaza abathombileko", en: "initiated girls names", image: "/img/girls.png", to: "/history/names/abantazana" },
  { nd: "Amabizo wamasokana", en: "initiated boys names", image: "/img/b.png", to: "/history/names/amasokana" },
  { nd: "Amabizo wabalobokazi", en: "bridal names", image: "/img/lobokazi.png", to: "/history/names/abalobokazi" },
  { nd: "Intanga zamasokana", en: "initiation group names", image: "/img/c.png", to: "/history/intanga" },
];

export default function History() {
  return (
    <Screen title="History" color={colors.history} bodyBg={colors.history}>
      <MenuGrid>
        {ITEMS.map((i) => (
          <MenuCard
            key={i.to}
            to={i.to}
            image={i.image}
            title={i.nd}
            subtitle={i.en}
            titleColor={colors.history}
          />
        ))}
      </MenuGrid>
    </Screen>
  );
}

export function HistoryView() {
  const { title = "", sub = "" } = useParams();
  const { loading, error, data } = useAsync(() => getHistory(sub), [sub]);

  return (
    <Screen title={title.toUpperCase()} color={colors.blueGrey}>
      {loading ? (
        <Spinner />
      ) : error || !data ? (
        <ErrorMessage />
      ) : (
        <PairList items={data.map((d) => ({ nd: d.nameE, en: d.nameNd }))} />
      )}
    </Screen>
  );
}

function KingsList({ group }: { group: string }) {
  const { loading, error, data } = useAsync(() => getKings(group), [group]);
  if (loading) return <Spinner />;
  if (error || !data) return <ErrorMessage />;
  return <PairList items={data.map((k) => ({ nd: k.king, en: k.desc }))} />;
}

export function Kings() {
  return (
    <Screen title="Ingwenyama - Kings" color={colors.history}>
      <Tabs
        color={colors.history}
        tabs={[
          { label: "Nzunza", content: <KingsList group="NzunzaKings" /> },
          { label: "Manala", content: <KingsList group="ManalaKings" /> },
        ]}
      />
    </Screen>
  );
}

export function Intanga() {
  return (
    <Screen title="Intanga zamasokana" color={colors.history}>
      <Tabs
        color={colors.history}
        tabs={[
          { label: "Nzunza", content: <PairList items={intangaNzunza} /> },
          { label: "Manala", content: <PairList items={intangaManala} /> },
        ]}
      />
    </Screen>
  );
}

const NAME_LISTS: Record<string, { title: string; names: string[] }> = {
  abesegwabo: { title: "Amabizo wabeSegwabo", names: abesegwabo },
  abantazana: { title: "Abentazana abathombileko", names: abantazana },
  amasokana: { title: "Amasokana wakwaNzunza", names: amasokana },
  abalobokazi: { title: "Abalobokoza", names: abalobokazi },
};

export function NameList() {
  const { id = "" } = useParams();
  const list = NAME_LISTS[id];
  if (!list) return <Navigate to="/history" replace />;
  return (
    <Screen title={list.title} color={colors.blueGrey}>
      <PairList items={list.names.map((n) => ({ nd: n }))} />
    </Screen>
  );
}
