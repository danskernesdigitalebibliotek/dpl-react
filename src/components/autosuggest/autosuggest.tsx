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
  isLoading
}) => {
  const t = useText();

  if (isLoading && !textData) {
    return (
      <ul className="autosuggest pb-16">
        <li className="ml-24">{t("LoadingText")}</li>
      </ul>
    );
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
              textAndMaterialDataLength={textData.length + materialData.length}
              autosuggestCategoryList={autosuggestCategoryList}
            />
          </>
        )}
      </ul>
    </>
  );
};
