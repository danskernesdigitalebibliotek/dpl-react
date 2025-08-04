import { LocalSuggestionsFromQueryStringQuery } from "../../dbc-gateway/generated/graphql";

export type Suggestions =
  LocalSuggestionsFromQueryStringQuery["localSuggest"]["result"];

export type Suggestion = Suggestions[0];
