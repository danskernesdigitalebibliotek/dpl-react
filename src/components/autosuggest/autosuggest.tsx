import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { SuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";
import AutosuggestMaterial from "../autosuggest-material/autosuggest-material";
import { AutosuggestText } from "../autosuggest-text/autosuggest-text";
import {
  Suggestion,
  SuggestionWork
} from "../autosuggest-text/autosuggest-text-item";

export interface AutosuggestProps {
  q: string | undefined;
  data: SuggestionsFromQueryStringQuery | undefined;
  isLoading: boolean;
  status: string;
  getMenuProps: UseComboboxPropGetters<unknown>["getMenuProps"];
  highlightedIndex: number;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  isOpen: boolean;
}

export const Autosuggest: React.FC<AutosuggestProps> = ({
  q,
  data,
  isLoading,
  status,
  getMenuProps,
  highlightedIndex,
  getItemProps,
  isOpen
}) => {
  const originalData = data?.suggest.result;
  const textData: Suggestion[] = [];
  const materialData: SuggestionWork[] = [];

  if (originalData) {
    originalData.forEach((item) => {
      if (item.__typename === "Work") {
        if (materialData.length < 3) {
          materialData.push(item);
          return;
        }
      }
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
