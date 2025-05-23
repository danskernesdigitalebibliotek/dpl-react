export const enum ManifestationMaterialType {
  book = "bog",
  ebook = "e-bog",
  movie = "film",
  movieBluRay = "film (blu-ray)",
  movieDvd = "film (dvd)",
  audioBook = "lydbog (online)",
  audioBookGeneric = "lydbog",
  music = "node",
  game = "playstation 5",
  animatedSeries = "tegneserie",
  article = "artikel",
  paperArticle = "avisartikel",
  onlineArticle = "artikel (online)",
  // This is not fixable at this point. Both (physical) articles and digital articles map to the same string
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  earticle = "artikel",
  boardGame = "spil",
  cdRom = "cd",
  magazine = "tidsskrift",
  pictureBookOnline = "billedbog (online)",
  animatedSeriesOnline = "tegneserie (online)",
  yearBookOnline = "årbog (online)",
  yearBook = "årbog",
  podcast = "podcast",
  musicOnline = "musik (online)",
  audioBookTape = "lydbog (bånd)",
  newspaper = "avis"
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
