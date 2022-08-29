import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { SuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";
import { Suggestion, Suggestions } from "../../core/utils/types/autosuggest";
import AutosuggestCategory from "../autosuggest-category/autosuggest-category";
import AutosuggestMaterial from "../autosuggest-material/autosuggest-material";
import { AutosuggestText } from "../autosuggest-text/autosuggest-text";

export interface AutosuggestProps {
  originalData:
    | SuggestionsFromQueryStringQuery["suggest"]["result"]
    | undefined;
  textData: SuggestionsFromQueryStringQuery["suggest"]["result"];
  materialData: Suggestions;
  isLoading: boolean;
  status: string;
  getMenuProps: UseComboboxPropGetters<unknown>["getMenuProps"];
  highlightedIndex: number;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  isOpen: boolean;
  categoryData?: SuggestionsFromQueryStringQuery["suggest"]["result"];
  autosuggestCategoryList: string[];
}

export const Autosuggest: React.FC<AutosuggestProps> = ({
  originalData,
  textData,
  materialData,
  status,
  getMenuProps,
  highlightedIndex,
  getItemProps,
  isOpen,
  categoryData,
  autosuggestCategoryList
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

        {originalData && status && isOpen && (
          <>
            <AutosuggestText
              textData={textData}
              highlightedIndex={highlightedIndex}
              getItemProps={getItemProps}
            />
            {materialData.length > 0 && (
              <>
                <li className="autosuggest__divider" />
                <AutosuggestMaterial
                  materialData={materialData}
                  getItemProps={getItemProps}
                  highlightedIndex={highlightedIndex}
                  textDataLength={textData.length}
                />
              </>
            )}
            {categoryData && categoryData.length > 0 && (
              <>
                <li className="autosuggest__divider" />
                <AutosuggestCategory
                  categoryData={categoryData}
                  getItemProps={getItemProps}
                  highlightedIndex={highlightedIndex}
                  textAndMaterialDataLength={
                    textData.length + materialData.length
                  }
                  autosuggestCategoryList={autosuggestCategoryList}
                />
              </>
            )}
          </>
        )}
      </ul>
    </>
  );
};
