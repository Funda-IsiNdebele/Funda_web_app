import { getContent } from "./api";
import {
  colours,
  days,
  directions,
  months,
  numbers,
  planets,
  seasons,
  time,
} from "./data/database";

export interface LearnItem {
  topic: string;
  nd: string;
  en: string;
  image?: string;
  hex?: string;
  /** Route where the learner can see more of this topic. */
  to: string;
}

const pairs = (
  topic: string,
  to: string,
  list: { nd: string; en: string; image?: string }[],
): LearnItem[] => list.map((p) => ({ topic, to, nd: p.nd, en: p.en, image: p.image }));

/** Words that ship with the app, so the card works offline. */
export const staticPool: LearnItem[] = [
  ...pairs("Numbers", "/basics/numbers", numbers),
  ...pairs("Days of the week", "/basics/days", days),
  ...pairs("Months of the year", "/basics/months", months),
  ...pairs("Directions", "/basics/directions", directions),
  ...pairs("Seasons", "/basics/seasons", seasons),
  ...pairs("Time", "/basics/time", time),
  ...pairs("Planets", "/dictionary/planets", planets),
  ...colours.map((c) => ({
    topic: "Colours",
    to: "/dictionary/colours",
    nd: c.nd,
    en: c.en,
    hex: c.hex,
  })),
];

/** Online categories (animals and picture dictionary) that can join the pool. */
const REMOTE: { base: string; category: string; topic: string }[] = [
  { base: "animals", category: "birds", topic: "Birds" },
  { base: "animals", category: "herbivores", topic: "Herbivores" },
  { base: "animals", category: "domestic", topic: "Domestic animals" },
  { base: "animals", category: "insects", topic: "Insects" },
  { base: "dictionary", category: "bodyParts", topic: "Body parts" },
  { base: "dictionary", category: "kinship", topic: "Kinship" },
  { base: "dictionary", category: "food", topic: "Fruits & Veg" },
  { base: "dictionary", category: "clothes", topic: "Traditional attire" },
];

/** Loads one random online category; resolves to [] if the network is unavailable. */
export async function loadRemoteItems(): Promise<LearnItem[]> {
  const pick = REMOTE[Math.floor(Math.random() * REMOTE.length)];
  try {
    const rows = await getContent(`${pick.base}/`, pick.category);
    return rows
      .filter((r) => r.nameNd && r.nameE)
      .map((r) => ({
        topic: pick.topic,
        to: `/content/${pick.base}/${pick.category}`,
        nd: r.nameNd,
        en: r.nameE,
        image: r.image || undefined,
      }));
  } catch {
    return [];
  }
}

/** Random item that differs from `previous` when the pool allows it. */
export function pickRandom(pool: LearnItem[], previous?: LearnItem | null): LearnItem {
  if (pool.length < 2) return pool[0];
  let next = pool[Math.floor(Math.random() * pool.length)];
  while (next === previous) next = pool[Math.floor(Math.random() * pool.length)];
  return next;
}
