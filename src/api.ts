import type {
  DataModel,
  HistoryItem,
  King,
  Surname,
  WisdomItem,
} from "./types";

/**
 * The Funda API (AWS API Gateway) sends no CORS headers, so browsers can't call it
 * directly. Requests go to same-origin "/api/", which the Vite dev/preview server
 * proxies to the API (see vite.config.ts). Production hosting needs the same rewrite.
 */
const BASE_URL = "/api/";
// The old Heroku host is gone; Wisdom and Kings are served by the same API now.
const LEGACY_URL = BASE_URL;

type Json = Record<string, unknown>;

const str = (v: unknown): string => (typeof v === "string" ? v : "");

// Responses used to be cached in localStorage forever. The service worker now caches
// them (stale-while-revalidate, see vite.config.ts), so clear the old entries once.
try {
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith("funda:/") || key.startsWith("funda:http")) localStorage.removeItem(key);
  }
} catch {
  /* storage unavailable: nothing to clean */
}

/** GET a JSON array. Caching is handled by the service worker. */
async function getList(url: string): Promise<Json[]> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const data = (await res.json()) as unknown;
  if (!Array.isArray(data)) throw new Error("Unexpected response");
  return data as Json[];
}

/** category e.g. "birds", base e.g. "animals/" or "dictionary/" */
export async function getContent(base: string, category: string): Promise<DataModel[]> {
  const rows = await getList(BASE_URL + base + category);
  return rows.map((r) => ({
    nameE: str(r.english),
    nameNd: str(r.isindebele),
    image: str(r.image),
    desc: str(r.desc),
  }));
}

export async function getSurnames(): Promise<Surname[]> {
  const rows = await getList(BASE_URL + "surnames/Imbongo");
  return rows.map((r) => ({
    surname: str(r.surname),
    desc: str(r.desc),
    image: str(r.image),
    sub: str(r.sub),
  }));
}

export async function getSubSurnames(clan: string): Promise<Surname[]> {
  const rows = await getList(BASE_URL + "surnames/" + encodeURIComponent(clan));
  // Flutter's SubImbongoData maps clan -> surname and surname -> sub.
  return rows.map((r) => ({
    surname: str(r.clan),
    desc: str(r.desc),
    image: str(r.image),
    sub: str(r.surname),
  }));
}

export async function getHistory(sub: string): Promise<HistoryItem[]> {
  const rows = await getList(BASE_URL + "history/" + sub);
  return rows.map((r) => ({ nameE: str(r.english), nameNd: str(r.isindebele) }));
}

export async function getKings(group: string): Promise<King[]> {
  const rows = await getList(LEGACY_URL + "history/" + group);
  return rows.map((r) => ({ king: str(r.king), desc: str(r.desc) }));
}

export async function getWisdom(kind: string): Promise<WisdomItem[]> {
  const rows = await getList(LEGACY_URL + "wisdom/" + kind);
  return rows.map((r) => ({ nameE: str(r.english), nameNd: str(r.isindebele) }));
}
