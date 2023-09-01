export type AdvancedSearchIndex =
  | "all"
  | "creator"
  | "subject"
  | "genre"
  | "language"
  | "date"
  | "mainCreator"
  | "mainTitle"
  | "source"
  | "dateFirstEdition"
  | "decimaldk5"
  | "type"
  | "audience"
  | "publisher"
  | "identifier"
  | "acSource";

export const AdvancedSearchIndexes: AdvancedSearchIndex[] = [
  "all",
  "creator",
  "subject",
  "genre",
  "language",
  "date",
  "mainCreator",
  "mainTitle",
  "source",
  "dateFirstEdition",
  "decimaldk5",
  "type",
  "audience",
  "publisher",
  "identifier",
  "acSource"
];

export const AdvancedSearchIndexTranslations = {
  all: "advancedSearchAllIndexesText",
  creator: "advancedSearchCreatorText",
  subject: "advancedSearchSubjectText",
  genre: "advancedSearchGenreText",
  language: "advancedSearchLanguageText",
  date: "advancedSearchDateText",
  mainCreator: "advancedSearchMainCreatorText",
  mainTitle: "advancedSearchMainTitleText",
  source: "advancedSearchSourceText",
  dateFirstEdition: "advancedSearchDateFirstEditionText",
  decimaldk5: "advancedSearchDecimalDk5Text",
  type: "advancedSearchTypeText",
  audience: "advancedSearchAudienceText",
  publisher: "advancedSearchPublisherText",
  identifier: "advancedSearchIdentifierText",
  acSource: "advancedSearchAcSourceText"
};

export type AdvancedSearchClause = "AND" | "OR" | "NOT";

export const AdvancedSearchClauses: AdvancedSearchClause[] = [
  "AND",
  "OR",
  "NOT"
];

export type AdvancedSearchRowData = {
  term: string;
  searchIndex: AdvancedSearchIndex | "";
  clause: AdvancedSearchClause;
};
