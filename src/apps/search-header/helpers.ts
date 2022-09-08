import {
  SuggestionType,
  SuggestionsFromQueryStringQuery
} from "../../core/dbc-gateway/generated/graphql";

export function findNonWorkSuggestion(
  originalData: SuggestionsFromQueryStringQuery["suggest"]["result"] | []
) {
  return originalData.find(
    (item) =>
      item.type !== SuggestionType.Title &&
      item.type !== SuggestionType.Composit
  );
}

export default findNonWorkSuggestion;
