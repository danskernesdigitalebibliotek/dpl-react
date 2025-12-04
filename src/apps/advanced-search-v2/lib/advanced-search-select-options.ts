import type { Option, RangePreset } from "../types";

const currentYear = new Date().getFullYear();

export const MATERIAL_TYPE_OPTIONS: Option[] = [
  { label: "Bøger", value: "bøger" },
  { label: "E-bøger", value: "e-bøger" },
  { label: "Lydbøger", value: "lydbøger" },
  { label: "Podcasts", value: "podcasts" },
  { label: "Film", value: "film" },
  { label: "Tv-serier", value: "tv-serier" },
  { label: "Musik", value: "musik" },
  { label: "Noder", value: "noder" },
  { label: "Aviser og tidsskrifter", value: "aviser og tidsskrifter" },
  { label: "Tegneserier", value: "tegneserier" },
  { label: "Computerspil", value: "computerspil" }
];

export const GENRE_OPTIONS: Option[] = [
  { label: "romaner", value: "romaner" },
  { label: "noveller", value: "noveller" },
  { label: "digte", value: "digte" },
  { label: "biografier", value: "biografier" },
  { label: "tv-serier", value: "tv-serier" },
  { label: "dokumentarfilm", value: "dokumentarfilm" },
  { label: "børnefilm", value: "børnefilm" },
  { label: "drama", value: "drama" },
  { label: "actionfilm", value: "actionfilm" },
  { label: "rock", value: "rock" },
  { label: "jazz", value: "jazz" },
  { label: "pop", value: "pop" },
  { label: "shooters", value: "shooters" },
  { label: "actionspil", value: "actionspil" },
  { label: "adventurespil", value: "adventurespil" }
];
export const LANGUAGE_OPTIONS: Option[] = [
  { label: "dansk", value: "dansk" },
  { label: "engelsk", value: "engelsk" },
  { label: "færøsk", value: "færøsk" },
  { label: "kalaallisut", value: "kalaallisut" },
  { label: "tysk", value: "tysk" },
  { label: "fransk", value: "fransk" },
  { label: "spansk", value: "spansk" },
  { label: "svensk", value: "svensk" },
  { label: "norsk", value: "norsk" }
];

export const SOURCE_OPTIONS: Option[] = [
  { label: "Bibliotekskatalog", value: "bibliotekskatalog" },
  { label: "eReolen", value: "ereolen" },
  { label: "eReolen Global", value: "ereolen global" }
];

export const YEAR_PRESETS: RangePreset[] = [
  {
    id: "current-year",
    label: `I år (${currentYear})`,
    from: currentYear,
    to: currentYear
  },
  {
    id: "last-2-years",
    label: "Seneste 2 år",
    from: currentYear - 1,
    to: currentYear
  },
  {
    id: "last-3-years",
    label: "Seneste 3 år",
    from: currentYear - 2,
    to: currentYear
  },
  {
    id: "last-5-years",
    label: "Seneste 5 år",
    from: currentYear - 4,
    to: currentYear
  },
  {
    id: "last-10-years",
    label: "Seneste 10 år",
    from: currentYear - 10,
    to: currentYear
  }
];

export const AGE_PRESETS: RangePreset[] = [
  { id: "1-2", label: "For 1-2-årige", from: 1, to: 2 },
  { id: "3-6", label: "For 3-6-årige", from: 3, to: 6 },
  { id: "7-10", label: "For 7-10-årige", from: 7, to: 10 },
  { id: "11-13", label: "For 11-13-årige", from: 11, to: 13 },
  { id: "14-16", label: "For 14-16-årige", from: 14, to: 16 }
];
