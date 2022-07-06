import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { useText } from "../../core/utils/text";
import { generateItemId } from "../autosuggest-text/autosuggest-text";
import {
  Suggestion,
  SuggestionWork
} from "../autosuggest-text/autosuggest-text-item";
import { Cover } from "../cover/cover";
import { creatorsToString } from "../search-result-list/helpers";

export interface AutosuggestMaterialProps {
  materialData: SuggestionWork[];
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  highlightedIndex: number;
  textDataLength: number;
}

const AutosuggestMaterial: React.FC<AutosuggestMaterialProps> = ({
  materialData,
  getItemProps,
  highlightedIndex,
  textDataLength
}) => {
  const t = useText();
  if (materialData.length < 1) {
    return <div />;
  }
  return (
    <>
      <li className="autosuggest__divider" />
      <li>
        <ul className="autosuggest__materials">
          {/* eslint-disable react/jsx-props-no-spreading */}
          {/* The downshift combobox works this way by design */}
          {materialData.map((item, incorrectIndex) => {
            const index = incorrectIndex + textDataLength;
            const authors: string[] = [];
            item.creators.forEach((creator) => {
              authors.push(creator.name);
            });
            return (
              <li
                className={`autosuggest__material ${
                  highlightedIndex === index
                    ? "autosuggest__material--highlight"
                    : ""
                }`}
                key={generateItemId(item)}
                {...getItemProps({ item, index })}
              >
                {/* eslint-enable react/jsx-props-no-spreading */}
                <div className="autosuggest__material__content">
                  <div className="autosuggest__cover">
                    {/* TODO: once we have the material page and know what the urls look like, we need to pass materialUrl here */}
                    <Cover
                      animate
                      size="xsmall"
                      materialId={item.manifestations[0].pid}
                    />
                  </div>
                  <div className="autosuggest__info">
                    <div className="text-body-medium-medium autosuggest__title">
                      {item.fullTitle}
                    </div>
                    <div className="text-body-small-regular autosuggest__author">
                      {creatorsToString(authors, t)}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </li>
    </>
  );
};

export default AutosuggestMaterial;
