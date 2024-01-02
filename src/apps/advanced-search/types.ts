import { MultiselectOption } from "../../components/multiselect/types";

export const advancedSearchIndexes = [
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
] as const;

export const advancedSearchIndexTranslations = {
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
} as const;

export type AdvancedSearchIndex = typeof advancedSearchIndexes[number];

export type AdvancedSearchClause = {
  value: "AND" | "OR" | "NOT";
  translation: string;
};

export const advancedSearchClauses: AdvancedSearchClause[] = [
  { value: "AND", translation: "clauseAndText" },
  { value: "OR", translation: "clauseOrText" },
  { value: "NOT", translation: "clauseNotText" }
];

export type AdvancedSearchRowData = {
  term: string;
  searchIndex: AdvancedSearchIndex | "";
  clause: AdvancedSearchClause;
  id: number;
};

export type AdvancedSearchRowUpdateRowAspect =
  | "term"
  | "searchIndex"
  | "clause";

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
    { term: "", searchIndex: "all", clause: advancedSearchClauses[0], id: 0 },
    { term: "", searchIndex: "all", clause: advancedSearchClauses[0], id: 1 }
  ],
  filters: {
    materialTypes: [{ item: "multiselectAllOptionText", value: "all" }],
    fiction: [{ item: "multiselectAllOptionText", value: "all" }],
    accessibility: [{ item: "multiselectAllOptionText", value: "all" }]
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
