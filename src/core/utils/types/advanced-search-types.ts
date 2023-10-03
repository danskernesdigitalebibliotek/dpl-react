import { MultiselectOption } from "./multiselect-types";

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

export type AdvancedSearchFilterData = {
  materialTypes: MultiselectOption[];
  fiction: MultiselectOption[];
  accessibility: MultiselectOption[];
};

export type AdvancedSearchQuery = {
  rows: AdvancedSearchRowData[];
  filters: AdvancedSearchFilterData;
};

export const initialAdvancedSearchQuery: AdvancedSearchQuery = {
  rows: [
    { term: "", searchIndex: "all", clause: "AND" },
    { term: "", searchIndex: "all", clause: "AND" }
  ],
  filters: {
    materialTypes: [{ item: "All", value: "all" }],
    fiction: [{ item: "All", value: "all" }],
    accessibility: [{ item: "All", value: "all" }]
  }
};

export const advancedSearchMaterialTypes: MultiselectOption[] = [
  { item: "Bog", value: "bøger" },
  { item: "E-bog", value: "e-bøger" },
  { item: "Lydbog", value: "lydbøger" },
  { item: "Artikel", value: "artikler" },
  { item: "Film", value: "film" },
  { item: "Musik", value: "musik" }
];

export const advancedSearchAccessibility: MultiselectOption[] = [
  { item: "Fysisk", value: "fysisk" },
  { item: "Online", value: "online" }
];

export const advancedSearchFiction: MultiselectOption[] = [
  { item: "Skønlitteratur", value: "fiction" },
  { item: "Faglitteratur", value: "nonfiction" }
];

export const advancedSearchFilters = {
  materialTypes: "generalmaterialtype",
  fiction: "fictionnonfiction",
  accessibility: "accesstype"
};
