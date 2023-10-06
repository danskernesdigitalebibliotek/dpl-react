import { MultiselectOption } from "../../core/utils/types/multiselect-types";

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

export type AdvancedSearchClause = {
  value: "AND" | "OR" | "NOT";
  translation: string;
};

export const AdvancedSearchClauses: AdvancedSearchClause[] = [
  { value: "AND", translation: "clauseAndText" },
  { value: "OR", translation: "clauseOrText" },
  { value: "NOT", translation: "clauseNotText" }
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
    { term: "", searchIndex: "all", clause: AdvancedSearchClauses[0] },
    { term: "", searchIndex: "all", clause: AdvancedSearchClauses[0] }
  ],
  filters: {
    materialTypes: [{ item: "All", value: "all" }],
    fiction: [{ item: "All", value: "all" }],
    accessibility: [{ item: "All", value: "all" }]
  }
};

export const advancedSearchMaterialTypes: MultiselectOption[] = [
  { item: "advancedSearchFilterBookText", value: "bøger" },
  { item: "advancedSearchFilterEbookText", value: "e-bøger" },
  { item: "advancedSearchFilterAudioBookText", value: "lydbøger" },
  { item: "advancedSearchFilterArticleText", value: "artikler" },
  { item: "advancedSearchFilterMovieText", value: "film" },
  { item: "advancedSearchFilterMusicText", value: "musik" }
];

export const advancedSearchAccessibility: MultiselectOption[] = [
  { item: "advancedSearchFilterPhysicalText", value: "fysisk" },
  { item: "advancedSearchFilterOnlineText", value: "online" }
];

export const advancedSearchFiction: MultiselectOption[] = [
  { item: "advancedSearchFilterFictionText", value: "fiction" },
  { item: "advancedSearchFilterNonFictionText", value: "nonfiction" }
];

export const advancedSearchFilters = {
  materialTypes: "generalmaterialtype",
  fiction: "fictionnonfiction",
  accessibility: "accesstype"
};
