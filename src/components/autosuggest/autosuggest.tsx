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
  originalData:
    | SuggestionsFromQueryStringQuery["suggest"]["result"]
    | undefined;
  textData: SuggestionsFromQueryStringQuery["suggest"]["result"];
  materialData: SuggestionWork[];
  isLoading: boolean;
  status: string;
  getMenuProps: UseComboboxPropGetters<unknown>["getMenuProps"];
  highlightedIndex: number;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  isOpen: boolean;
}

export const Autosuggest: React.FC<AutosuggestProps> = ({
  originalData,
  textData,
  materialData,
  isLoading,
  status,
  getMenuProps,
  highlightedIndex,
  getItemProps,
  isOpen
}) => {
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

        {originalData !== undefined && status === "success" && isOpen && (
          <>
            <AutosuggestText
              textData={textData}
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
