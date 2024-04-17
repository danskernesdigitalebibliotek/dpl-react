import {
  SuggestionType,
  SuggestionsFromQueryStringQuery
} from "../../core/dbc-gateway/generated/graphql";
import { Suggestion } from "../../core/utils/types/autosuggest";
import { AutosuggestCategory } from "../../core/utils/types/material-type";
import { UseTextFunction } from "../../core/utils/text";

export const getAutosuggestCategoryList = (t: UseTextFunction) => {
  const autosuggestCategoryList = [
    {
      render: t("autosuggestBookCategoryText"),
      term: AutosuggestCategory.book,
      facet: "materialTypesSpecific"
    },
    {
      render: t("autosuggestEbookCategoryText"),
      term: AutosuggestCategory.ebook,
      facet: "materialTypesSpecific"
    },
    {
      render: t("autosuggestFilmCategoryText"),
      term: AutosuggestCategory.movie,
      facet: "workTypes"
    },
    {
      render: t("autosuggestAudioBookCategoryText"),
      term: AutosuggestCategory.audioBook,
      facet: "materialTypesSpecific"
    },
    {
      render: t("autosuggestMusicCategoryText"),
      term: AutosuggestCategory.music,
      facet: "workTypes"
    },
    {
      render: t("autosuggestGameCategoryText"),
      term: AutosuggestCategory.game,
      facet: "workTypes"
    },
    {
      render: t("autosuggestAnimatedSeriesCategoryText"),
      term: AutosuggestCategory.animatedSeries,
      facet: "materialTypesSpecific"
    }
  ];
  return autosuggestCategoryList;
};

export function findNonWorkSuggestion(
  originalData: SuggestionsFromQueryStringQuery["suggest"]["result"] | []
) {
  return originalData.find(
    (item) =>
      item.type !== SuggestionType.Title &&
      item.type !== SuggestionType.Composit
  );
}

export function determineSuggestionTerm(suggestion: Suggestion): string {
  if (suggestion.type === SuggestionType.Composit) {
    return suggestion.work?.titles.main[0] || "incomplete data";
  }
  return suggestion.term;
}

export function isDisplayedAsWorkSuggestion(
  selectedItem: Suggestion["work"],
  currentMaterialData: Suggestion[]
) {
  const dataWithWorkId = currentMaterialData.filter(
    (item) => item.work?.workId === selectedItem?.workId
  );
  return Boolean(dataWithWorkId.length);
}

export default {};
