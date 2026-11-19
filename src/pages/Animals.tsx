import { colors } from "../colors";
import { MenuCard,
  MenuGrid, Screen } from "../components/ui";

// Image names are kept as in the Flutter app (herbivores/carnivores icons were swapped there).
const ITEMS = [
  { title: "Birds", nd: "Iinyoni", image: "/img/bird.png", category: "birds" },
  { title: "Carnivores & Omnivores", nd: "Imbandana", image: "/img/herbi.png", category: "carnivores" },
  { title: "Herbivores", nd: "Iinyamazana", image: "/img/carni.png", category: "herbivores" },
  { title: "Snakes & Reptiles", nd: "Iinyoka", image: "/img/snake.png", category: "snakes" },
  { title: "Insects & Worms", nd: "Iinunwana", image: "/img/insect.png", category: "insects" },
  { title: "Domestic animals", nd: "Iinlwane ezifuywako", image: "/img/domestic.jpg", category: "domestic" },
];

export default function Animals() {
  return (
    <Screen title="Animals - Inlwane" color={colors.animals} bodyBg={colors.animals}>
      <MenuGrid>
        {ITEMS.map((i) => (
          <MenuCard
            key={i.category}
            to={`/content/animals/${i.category}`}
            image={i.image}
            title={i.nd}
            subtitle={i.title}
            titleColor={colors.animals}
          />
        ))}
      </MenuGrid>
    </Screen>
  );
}
