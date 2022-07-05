import { UseComboboxPropGetters } from "downshift";
import React from "react";
import {
  SuggestionsFromQueryStringQuery,
  SuggestionType
} from "../../core/dbc-gateway/generated/graphql";
import { Suggestion, Suggestions } from "../../core/utils/types/autosuggest";
import AutosuggestMaterial from "../autosuggest-material/autosuggest-material";
import { AutosuggestText } from "../autosuggest-text/autosuggest-text";

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
  const originalData = data?.suggest.result;
  const textData: Suggestions | [] = [];
  const materialData: Suggestions | [] = [];

  if (originalData) {
    originalData.forEach((item) => {
      if (item.type === SuggestionType.Composit) {
        if (materialData.length < 3) {
          // @ts-expect-error TODO: item
          materialData.push(item);
          return;
        }
      }
      // @ts-expect-error TODO: item
      textData.push(item);
    });
  }

  return (
    <>
      {/* eslint-disable react/jsx-props-no-spreading */}
      {/* The downshift combobox works this way by design */}
      <ul
        className="autosuggest pb-16"
        {...getMenuProps()}
        style={!isOpen ? { display: "none" } : {}}
      >
        {/* eslint-enable react/jsx-props-no-spreading */}

        {isLoading && <div>Loading</div>}

        {data && data.suggest.result.length < 1 && null}

        {data && status === "success" && isOpen && (
          <>
            <AutosuggestText
              responseData={textData}
              currentQ={q}
              highlightedIndex={highlightedIndex}
              getItemProps={getItemProps}
              stringSuggestionAuthorText={stringSuggestionAuthorText}
              stringSuggestionWorkText={stringSuggestionWorkText}
              stringSuggestionTopicText={stringSuggestionTopicText}
            />
            <AutosuggestMaterial
              materialData={materialData}
              getItemProps={getItemProps}
              highlightedIndex={highlightedIndex}
              textDataLength={textData.length}
            />
          </>
        )}
      </ul>
    </>
  );
};
