import React from "react";
import {
  SuggestionsFromQueryStringQuery,
  useSuggestionsFromQueryStringQuery
} from "../../core/dbc-gateway/generated/graphql";
import { AutosuggestText } from "../autosuggest-text/autossugest-text";

export interface AutosuggestProps {
  q: string;
}

export const Autosuggest: React.FC<AutosuggestProps> = ({
  q = "placeholder"
}) => {
  const {
    data,
    isLoading,
    status
  }: {
    data: SuggestionsFromQueryStringQuery | undefined;
    isLoading: boolean;
    status: string;
  } = useSuggestionsFromQueryStringQuery({ q });

  if (isLoading) {
    return <ul className="autosuggest-text-container">Loading</ul>;
  }

  // if the service cannot find any suggestions
  if (data && data.suggest.result.length < 1) {
    return <ul className="autosuggest-text-container">Ingen suggestions</ul>;
  }

  if (data && status === "success") {
    return (
      <ul className="autosuggest-text-container">
        <AutosuggestText responseData={data.suggest.result} currentQ={q} />
      </ul>
    );
  }

  return null;
};
