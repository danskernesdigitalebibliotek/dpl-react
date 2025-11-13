import { ComplexSuggestionTypeEnum } from "../../../core/dbc-gateway/generated/graphql";

export type SearchIndexItem = {
  value: string;
  labelKey: string;
  type: ComplexSuggestionTypeEnum;
  placeholderKey: string;
};

export const SEARCH_INDEX_OPTIONS: SearchIndexItem[] = [
  {
    value: "term.default",
    labelKey: "advancedSearchLabelDefaultText",
    type: ComplexSuggestionTypeEnum.Default,
    placeholderKey: "advancedSearchPlaceholderDefaultText"
  },
  {
    value: "term.title",
    labelKey: "advancedSearchLabelTitleText",
    type: ComplexSuggestionTypeEnum.Title,
    placeholderKey: "advancedSearchPlaceholderTitleText"
  },
  {
    value: "term.creatorcontributor",
    labelKey: "advancedSearchLabelCreatorText",
    type: ComplexSuggestionTypeEnum.Creatorcontributor,
    placeholderKey: "advancedSearchPlaceholderCreatorText"
  },
  {
    value: "term.subject",
    labelKey: "advancedSearchLabelSubjectText",
    type: ComplexSuggestionTypeEnum.Subject,
    placeholderKey: "advancedSearchPlaceholderSubjectText"
  },
  {
    value: "term.publisher",
    labelKey: "advancedSearchLabelPublisherText",
    type: ComplexSuggestionTypeEnum.Publisher,
    placeholderKey: "advancedSearchPlaceholderPublisherText"
  },
  {
    value: "dk5",
    labelKey: "advancedSearchLabelDk5Text",
    type: ComplexSuggestionTypeEnum.Default,
    placeholderKey: "advancedSearchPlaceholderDk5Text"
  },
  {
    value: "term.isbn",
    labelKey: "advancedSearchLabelIsbnText",
    type: ComplexSuggestionTypeEnum.Default,
    placeholderKey: "advancedSearchPlaceholderIsbnText"
  },
  {
    value: "term.series",
    labelKey: "advancedSearchLabelSeriesText",
    type: ComplexSuggestionTypeEnum.Series,
    placeholderKey: "advancedSearchPlaceholderSeriesText"
  },
  {
    value: "term.fictionalcharacter",
    labelKey: "advancedSearchLabelFictionalCharacterText",
    type: ComplexSuggestionTypeEnum.Fictionalcharacter,
    placeholderKey: "advancedSearchPlaceholderFictionalCharacterText"
  },
  {
    value: "term.hostpublication",
    labelKey: "advancedSearchLabelHostPublicationText",
    type: ComplexSuggestionTypeEnum.Hostpublication,
    placeholderKey: "advancedSearchPlaceholderHostPublicationText"
  }
];
