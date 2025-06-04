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
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categoryData?: SuggestionsFromQueryStringQuery["suggest"]["result"];
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
  const t = useText();

  if (isLoading && !textData) {
    return (
      <ul className="autosuggest pb-16" data-cy={dataCy}>
        <li className="ml-24">{t("loadingText")}</li>
      </ul>
    );
  }

  return (
    <>
      {isOpen && (
        <div
          aria-hidden
          className="autosuggest-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* The downshift combobox works this way by design */}
      <ul
        className="autosuggest pb-16"
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
