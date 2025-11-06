import { ComplexSuggestionTypeEnum } from "../../core/dbc-gateway/generated/graphql";

export type SearchIndexItem = {
  value: string;
  label: string;
  type: ComplexSuggestionTypeEnum;
};

export const SEARCH_INDEX_OPTIONS: SearchIndexItem[] = [
  {
    value: "term.default",
    label: "Fritekstsøgning",
    type: ComplexSuggestionTypeEnum.Default
  },
  {
    value: "term.title",
    label: "Titel",
    type: ComplexSuggestionTypeEnum.Title
  },
  {
    value: "term.creatorcontributor",
    label: "Forfatter/ophav",
    type: ComplexSuggestionTypeEnum.Creatorcontributor
  },
  {
    value: "term.subject",
    label: "Emne",
    type: ComplexSuggestionTypeEnum.Subject
  },
  {
    value: "term.publisher",
    label: "Udgiver",
    type: ComplexSuggestionTypeEnum.Publisher
  },
  { value: "dk5", label: "DK5", type: ComplexSuggestionTypeEnum.Default },
  {
    value: "term.isbn",
    label: "ISBN",
    type: ComplexSuggestionTypeEnum.Default
  },
  {
    value: "term.series",
    label: "Serietitel",
    type: ComplexSuggestionTypeEnum.Series
  },
  {
    value: "term.fictionalcharacter",
    label: "Fiktiv karakter",
    type: ComplexSuggestionTypeEnum.Fictionalcharacter
  },
  {
    value: "term.hostpublication",
    label: "Værtspublikation",
    type: ComplexSuggestionTypeEnum.Hostpublication
  }
];
