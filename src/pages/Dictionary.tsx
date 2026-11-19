import { colors } from "../colors";
import { MenuCard,
  MenuGrid, PairList, Screen } from "../components/ui";
import { colours, planets } from "../data/database";

const ITEMS = [
  { title: "Planets", nd: "Amaphasi", image: "/img/planets.png", to: "/dictionary/planets" },
  { title: "Kinship", nd: "Amalunga womndeni", image: "/img/family.png", to: "/content/dictionary/kinship" },
  { title: "Body parts", nd: "Izitho zomzimba", image: "/img/body.png", to: "/content/dictionary/bodyParts" },
  { title: "Colours", nd: "Imibala", image: "/img/color.png", to: "/dictionary/colours" },
  { title: "Fruits & Veg", nd: "Iinthelo", image: "/img/food.png", to: "/content/dictionary/food" },
  { title: "Traditional attire", nd: "Ivunulo", image: "/img/clothe.png", to: "/content/dictionary/clothes" },
  { title: "", nd: "Others", image: "/img/proverbs.png", to: "/content/dictionary/others" },
];

export default function Dictionary() {
  return (
    <Screen title="Image Dictionary" color={colors.dictionary} bodyBg={colors.dictionary}>
      <MenuGrid>
        {ITEMS.map((i) => (
          <MenuCard
            key={i.to}
            to={i.to}
            image={i.image}
            title={i.nd}
            subtitle={i.title}
            titleColor={colors.dictionary}
          />
        ))}
      </MenuGrid>
    </Screen>
  );
}

export function Planets() {
  return (
    <Screen title="Planets" color={colors.dictionary}>
      <PairList items={planets.map((p) => ({ nd: p.nd, en: p.en, image: p.image }))} />
    </Screen>
  );
}

export function Colours() {
  return (
    <Screen title="Colours - Imibala" color={colors.dictionary}>
      <ul className="plain-list padded">
        {colours.map((c) => (
          <li key={c.en} className="word-card">
            <span className="swatch" style={{ background: c.hex }} />
            <div className="row-text">
              <div className="row-title">{c.nd}</div>
              <div className="row-sub">{c.en}</div>
            </div>
          </li>
        ))}
      </ul>
    </Screen>
  );
}
