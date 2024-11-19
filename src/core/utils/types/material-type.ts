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
  paperArticle = "avisartikel",
  onlineArticle = "artikel (online)",
  earticle = "artikel",
  boardGame = "spil",
  cdRom = "cd",
  magazine = "tidsskrift",
  pictureBookOnline = "billedbog (online)",
  animatedSeriesOnline = "tegneserie (online)",
  yearBookOnline = "årbog (online)"
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
