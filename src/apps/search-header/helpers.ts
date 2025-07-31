import { Suggestion } from "../../core/utils/types/autosuggest";
import { AutosuggestCategory } from "../../core/utils/types/material-type";
import { UseTextFunction } from "../../core/utils/text";
import {
  SuggestionsFromQueryStringQuery,
  SuggestionTypeEnum
} from "../../core/dbc-gateway/generated/graphql";
import {
  constructCreatorSearchUrl,
  constructDK5SearchUrl,
  constructSearchUrl,
  constructSubjectSearchUrl,
  getUrlQueryParam
} from "../../core/utils/helpers/url";

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
      item.type !== SuggestionTypeEnum.Title &&
      item.type !== SuggestionTypeEnum.Composit
  );
}

export function determineSuggestionTerm(suggestion: Suggestion): string {
  if (suggestion.type === SuggestionTypeEnum.Composit) {
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

enum SearchType {
  Creator = "creator",
  Subject = "subject",
  Dk5 = "dk5",
  General = "q"
}

interface SearchContext {
  searchType: SearchType;
  initialQuery: string;
  creatorFilter: string | null;
  subjectFilter: string | null;
  dk5Filter: string | null;
}

export function getSearchContextFromUrl(): SearchContext {
  const qParam = getUrlQueryParam("q");
  const creatorFilterParam = getUrlQueryParam("creators");
  const subjectFilterParam = getUrlQueryParam("subjects");
  const dk5FilterParam = getUrlQueryParam("dk5");

  // Determine search type based on filter parameters using guard clauses
  // Display filter value as initial query to allow user to see/edit it
  if (creatorFilterParam) {
    return {
      searchType: SearchType.Creator,
      initialQuery: creatorFilterParam,
      creatorFilter: creatorFilterParam,
      subjectFilter: subjectFilterParam,
      dk5Filter: dk5FilterParam
    };
  }

  if (subjectFilterParam) {
    return {
      searchType: SearchType.Subject,
      initialQuery: subjectFilterParam,
      creatorFilter: creatorFilterParam,
      subjectFilter: subjectFilterParam,
      dk5Filter: dk5FilterParam
    };
  }

  if (dk5FilterParam) {
    return {
      searchType: SearchType.Dk5,
      initialQuery: dk5FilterParam,
      creatorFilter: creatorFilterParam,
      subjectFilter: subjectFilterParam,
      dk5Filter: dk5FilterParam
    };
  }

  return {
    searchType: SearchType.General,
    initialQuery: qParam || "",
    creatorFilter: creatorFilterParam,
    subjectFilter: subjectFilterParam,
    dk5Filter: dk5FilterParam
  };
}

export function constructSearchUrlByType(
  searchType: SearchType,
  searchUrl: URL,
  query: string
): URL {
  switch (searchType) {
    case SearchType.Creator:
      return constructCreatorSearchUrl(searchUrl, query);
    case SearchType.Subject:
      return constructSubjectSearchUrl(searchUrl, query);
    case SearchType.Dk5:
      return constructDK5SearchUrl(searchUrl, query);
    case SearchType.General:
    default:
      return constructSearchUrl(searchUrl, query);
  }
}

export default {};
