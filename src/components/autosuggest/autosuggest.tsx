import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { SuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";
import {
  AutosuggestText,
  Suggestion
} from "../autosuggest-text/autossugest-text";

export interface AutosuggestProps {
  q: string | undefined;
  data: SuggestionsFromQueryStringQuery | undefined;
  isLoading: boolean;
  status: string;
  getMenuProps: UseComboboxPropGetters<unknown>["getMenuProps"];
  highlightedIndex: number;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  isOpen: boolean;
  stringSuggestionAuthorText?: string;
  stringSuggestionWorkText?: string;
  stringSuggestionTopicText?: string;
}

export const Autosuggest: React.FC<AutosuggestProps> = ({
  q,
  data,
  isLoading,
  status,
  getMenuProps,
  highlightedIndex,
  getItemProps,
  isOpen,
  stringSuggestionAuthorText = "author",
  stringSuggestionWorkText = "work",
  stringSuggestionTopicText = "topic"
}) => {
  return (
    <>
      {/* eslint-disable react/jsx-props-no-spreading */}
      {/* The downshift combobox works this way by design */}
      <ul
        className="autosuggest-text-container"
        {...getMenuProps()}
        style={!isOpen ? { display: "none" } : {}}
      >
        {/* eslint-enable react/jsx-props-no-spreading */}

        {isLoading && <div>Loading</div>}

        {data && data.suggest.result.length < 1 && null}

        {data && status === "success" && isOpen && (
          <AutosuggestText
            responseData={data.suggest.result}
            currentQ={q}
            highlightedIndex={highlightedIndex}
            getItemProps={getItemProps}
            stringSuggestionAuthorText={stringSuggestionAuthorText}
            stringSuggestionWorkText={stringSuggestionWorkText}
            stringSuggestionTopicText={stringSuggestionTopicText}
          />
        )}
      </ul>
    </>
  );
};
