import { SuggestionsFromQueryStringQuery } from "../../dbc-gateway/generated/graphql";

export type Suggestions = SuggestionsFromQueryStringQuery["suggest"]["result"];

export type Suggestion = Suggestions[0];
