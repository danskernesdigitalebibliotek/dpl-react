import { SuggestionsFromQueryStringQuery } from "../../dbc-gateway/generated/graphql";

export type Suggestions =
  SuggestionsFromQueryStringQuery["localSuggest"]["result"];

export type Suggestion = Suggestions[0];
