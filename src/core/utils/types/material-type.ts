export const enum ManifestationMaterialType {
  book = "bog",
  ebook = "e-bog",
  movie = "film",
  audioBook = "lydbog (online)",
  audioBookGeneric = "lydbog",
  music = "node",
  game = "playstation 5",
  animatedSeries = "tegneserie",
  article = "artikel",
  earticle = "artikel",
  boardGame = "spil",
  cdRom = "cd",
  magazine = "tidsskrift"
}

export const enum AutosuggestCategory {
  book = "bog",
  ebook = "e-bog",
  movie = "Film",
  audioBook = "lydbog (online)",
  music = "Musik",
  game = "Spil",
  animatedSeries = "tegneserie"
}

export type AutosuggestCategoryFacet = "materialTypesSpecific" | "workTypes";

export type AutosuggestCategoryList = {
  render: string;
  term: AutosuggestCategory;
  facet: AutosuggestCategoryFacet;
};

export default {};

export type DisplayMaterialType =
  | "bog"
  | "billedbog"
  | "billedbog (online)"
  | "e-bog"
  | "cd"
  | "podcast"
  | "musik (online)"
  | "film"
  | "film (online)"
  | "lydbog"
  | "lydbog (online)"
  | "lydbog (cd-mp3)"
  | "artikel"
  | "artikel (online)"
  | "tegneserie"
  | "tegneserie (online)"
  | "tidsskrift"
  | "tidsskrift (online)";
