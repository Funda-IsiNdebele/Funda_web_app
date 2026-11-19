import { Navigate, useParams } from "react-router-dom";
import { colors } from "../colors";
import { MenuCard,
  MenuGrid, PairList, Screen } from "../components/ui";
import { formatPairs, ShareFab } from "../components/Share";
import { days, directions, months, numbers, seasons, time } from "../data/database";

interface Category {
  id: string;
  nd: string;
  en: string;
  image: string;
  items: { nd: string; en: string; image?: string }[];
}

const CATEGORIES: Category[] = [
  { id: "numbers", nd: "Iimbalo", en: "Numbers", image: "/img/numbers.png", items: numbers },
  { id: "directions", nd: "Iinkomba ndlela", en: "Directions", image: "/img/direct.png", items: directions },
  { id: "seasons", nd: "Iingaba zonyaka", en: "Seasons of the year", image: "/img/season.png", items: seasons },
  { id: "months", nd: "Iinyanga zonyaka", en: "Months of the year", image: "/img/date.png", items: months },
  { id: "days", nd: "Amalanga weveke", en: "Days of the week", image: "/img/dys.png", items: days },
  { id: "time", nd: "Iinkathi", en: "Time", image: "/img/time.png", items: time },
];

export default function Basics() {
  return (
    <Screen title="Catagories" color={colors.basic} bodyBg={colors.basic}>
      <MenuGrid>
        {CATEGORIES.map((c) => (
          <MenuCard
            key={c.id}
            to={`/basics/${c.id}`}
            image={c.image}
            title={c.nd}
            subtitle={c.en}
            titleColor={colors.basic}
          />
        ))}
      </MenuGrid>
    </Screen>
  );
}

export function BasicsList() {
  const { id } = useParams();
  const category = CATEGORIES.find((c) => c.id === id);
  if (!category) return <Navigate to="/basics" replace />;
  return (
    <Screen title={category.en} color={colors.blueGrey}>
      <PairList items={category.items} />
      <ShareFab
        title={`${category.nd} – ${category.en}`}
        body={() => formatPairs(category.items)}
      />
    </Screen>
  );
}
