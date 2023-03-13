import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { SuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import { Suggestion, Suggestions } from "../../core/utils/types/autosuggest";
import AutosuggestCategory from "../autosuggest-category/autosuggest-category";
import AutosuggestMaterial from "../autosuggest-material/autosuggest-material";
import { AutosuggestText } from "../autosuggest-text/autosuggest-text";

export interface AutosuggestProps {
  textData: SuggestionsFromQueryStringQuery["suggest"]["result"];
  materialData: Suggestions;
  status: string;
  getMenuProps: UseComboboxPropGetters<unknown>["getMenuProps"];
  highlightedIndex: number;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  isOpen: boolean;
  categoryData?: SuggestionsFromQueryStringQuery["suggest"]["result"];
  autosuggestCategoryList: { render: string; type: string }[];
  isLoading: boolean;
  dataCy?: string;
}

export const Autosuggest: React.FC<AutosuggestProps> = ({
  textData,
  materialData,
  getMenuProps,
  highlightedIndex,
  getItemProps,
  isOpen,
  categoryData,
  autosuggestCategoryList,
  isLoading,
  dataCy = "autosuggest"
}) => {
  const t = useText();

  if (isLoading && !textData) {
    return (
      <ul className="autosuggest pb-16" data-cy={dataCy}>
        <li className="ml-24">{t("LoadingText")}</li>
      </ul>
    );
  }

  return (
    <>
      {/* The downshift combobox works by prop-spreading by design */}
      {/* eslint-disable react/jsx-props-no-spreading */}
      {/* Unless specifically stated, downshift would overwrite ul's list role */}
      {/* eslint-disable jsx-a11y/no-redundant-roles */}
      <ul
        className="autosuggest pb-16"
        id="autosuggest"
        aria-owns="suggestion-1 suggestion-2 suggestion-3 suggestion-4 suggestion-5 suggestion-6
        suggestion-7 suggestion-8 suggestion-9 suggestion-10 suggestion-11 suggestion-12 suggestion-13
        suggestion-14 suggestion-15 suggestion-16 suggestion-17"
        {...getMenuProps()}
        style={!isOpen ? { display: "none" } : {}}
        data-cy={dataCy}
        aria-busy="true"
        role="listbox"
      >
        {/* eslint-enable react/jsx-props-no-spreading */}
        {/* eslint-enable jsx-a11y/no-redundant-roles */}
        <ul>
          <AutosuggestText
            textData={textData}
            highlightedIndex={highlightedIndex}
            getItemProps={getItemProps}
          />
          {textData.length > 0 && materialData.length > 0 && (
            <li className="autosuggest__divider" />
          )}
          {materialData.length > 0 && (
            <AutosuggestMaterial
              materialData={materialData}
              getItemProps={getItemProps}
              highlightedIndex={highlightedIndex}
              textDataLength={textData.length}
            />
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
        </ul>
      </ul>
    </>
  );
};
