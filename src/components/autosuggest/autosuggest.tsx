import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { LocalSuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";
import { Suggestion, Suggestions } from "../../core/utils/types/autosuggest";
import AutosuggestCategory from "../autosuggest-category/autosuggest-category";
import AutosuggestMaterial from "../autosuggest-material/autosuggest-material";
import { AutosuggestText } from "../autosuggest-text/autosuggest-text";
import { createPortal } from "react-dom";

export interface AutosuggestProps {
  textData: LocalSuggestionsFromQueryStringQuery["localSuggest"]["result"];
  materialData: Suggestions;
  getMenuProps: UseComboboxPropGetters<unknown>["getMenuProps"];
  highlightedIndex: number;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categoryData?: LocalSuggestionsFromQueryStringQuery["localSuggest"]["result"];
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
  setIsOpen,
  categoryData,
  isLoading,
  dataCy = "autosuggest"
}) => {
  if (isLoading && !textData) {
    return null;
  }

  return (
    <>
      {createPortal(
        <div
          aria-hidden
          className={`autosuggest-backdrop ${isOpen ? "autosuggest-backdrop--open" : ""}`}
          onClick={() => setIsOpen(false)}
        />,
        document.body
      )}

      {/* The downshift combobox works this way by design */}
      <ul
        className={`autosuggest ${isOpen ? "autosuggest--open" : ""}`}
        // TODO: Explicitly define prop types for better clarity
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getMenuProps()}
        style={!isOpen ? { display: "none" } : {}}
        data-cy={dataCy}
      >
        <AutosuggestText
          textData={textData}
          highlightedIndex={highlightedIndex}
          getItemProps={getItemProps}
        />
        {materialData.length > 0 && (
          <AutosuggestMaterial
            materialData={materialData}
            getItemProps={getItemProps}
            highlightedIndex={highlightedIndex}
            textDataLength={textData.length}
          />
        )}
        {categoryData && categoryData.length > 0 && (
          <AutosuggestCategory
            categoryData={categoryData}
            getItemProps={getItemProps}
            highlightedIndex={highlightedIndex}
            textAndMaterialDataLength={textData.length + materialData.length}
          />
        )}
      </ul>
    </>
  );
};
