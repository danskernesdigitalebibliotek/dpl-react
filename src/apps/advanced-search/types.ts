import { MultiselectOption } from "../../components/multiselect/types";
import { SortOrderEnum } from "../../core/dbc-gateway/generated/graphql";

export const advancedSearchIndexes = [
  "all",
  "term.creatorcontributor",
  "term.subject",
  "term.genreandform",
  "term.mainlanguage",
  "datefirstedition",
  "term.creator",
  "term.title",
  "term.source",
  "dk5",
  "term.specificmaterialtype",
  "term.childrenoradults",
  "term.publisher",
  "term.isbn"
] as const;

export const advancedSearchIndexTranslations = {
  all: "advancedSearchAllIndexesText",
  "term.creatorcontributor": "advancedSearchCreatorText",
  "term.subject": "advancedSearchSubjectText",
  "term.genreandform": "advancedSearchGenreText",
  "term.mainlanguage": "advancedSearchLanguageText",
  datefirstedition: "advancedSearchDateText",
  "term.creator": "advancedSearchMainCreatorText",
  "term.title": "advancedSearchMainTitleText",
  "term.source": "advancedSearchSourceText",
  dk5: "advancedSearchDecimalDk5Text",
  "term.specificmaterialtype": "advancedSearchTypeText",
  "term.childrenoradults": "advancedSearchAudienceText",
  "term.publisher": "advancedSearchPublisherText",
  "term.isbn": "advancedSearchIdentifierText"
} as const;

export type AdvancedSearchIndex = (typeof advancedSearchIndexes)[number];

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
  materialTypes: "term.generalmaterialtype",
  fiction: "term.fictionnonfiction",
  accessibility: "term.accesstype"
};

export const enum AdvancedSortMapStrings {
  Relevance = "relevance",
  TitleAsc = "sort.title.asc",
  TitleDesc = "sort.title.desc",
  CreatorAsc = "sort.creator.asc",
  CreatorDesc = "sort.creator.desc",
  LatestPubDateAsc = "sort.latestpublicationdate.asc",
  LatestPubDateDesc = "sort.latestpublicationdate.desc"
}

type AdvancedSortMapType = Record<
  AdvancedSortMapStrings,
  { index: string; order: SortOrderEnum } | undefined
>;

export const advancedSortMap: AdvancedSortMapType = {
  // AdvancedSortMapStrings.Relevance is undefined to indicate default sorting (no explicit sort parameter sent)
  [AdvancedSortMapStrings.Relevance]: undefined,
  [AdvancedSortMapStrings.TitleAsc]: {
    index: "sort.title",
    order: SortOrderEnum.Asc
  },
  [AdvancedSortMapStrings.TitleDesc]: {
    index: "sort.title",
    order: SortOrderEnum.Desc
  },
  [AdvancedSortMapStrings.CreatorAsc]: {
    index: "sort.creator",
    order: SortOrderEnum.Asc
  },
  [AdvancedSortMapStrings.CreatorDesc]: {
    index: "sort.creator",
    order: SortOrderEnum.Desc
  },
  [AdvancedSortMapStrings.LatestPubDateAsc]: {
    index: "sort.latestpublicationdate",
    order: SortOrderEnum.Asc
  },
  [AdvancedSortMapStrings.LatestPubDateDesc]: {
    index: "sort.latestpublicationdate",
    order: SortOrderEnum.Desc
  }
};

export type FirstAccessionOperatorFilter = ">" | "=" | "<";
