import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { generateItemId } from "../autosuggest-text/autosuggest-text";
import {
  Suggestion,
  SuggestionWork
} from "../autosuggest-text/autosuggest-text-item";

export interface AutosuggestMaterialProps {
  materialData: SuggestionWork[] | [];
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
  return (
    <>
      <li className="autosuggest__divider" />
      <li>
        <ul className="autosuggest__materials">
          {/* eslint-disable react/jsx-props-no-spreading */}
          {/* The downshift combobox works this way by design */}
          {materialData.map((item, index) => {
            let numberOfAuthors = 0;
            return (
              <li
                className={`autosuggest__material ${
                  highlightedIndex === index + textDataLength
                    ? "autosuggest__material--highlight"
                    : ""
                }`}
                key={generateItemId(item)}
                {...getItemProps({ item, index })}
              >
                {/* eslint-enable react/jsx-props-no-spreading */}
                <div className="autosuggest__material__content">
                  <div className="autosuggest__cover">
                    <div className="material-container">
                      {/* TODO: once we have the material page, we need to link to the specific one from here. */}
                      <a
                        className="material material--xsmall bg-identity-tint-120 material__animate"
                        href="google.com"
                      >
                        {/* TODO: once we have the cover service calls, we get use the image covers here. */}
                        <img
                          src="https://imgcdn.saxo.com/_9781616550417/0x500"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div className="autosuggest__info">
                    <div className="text-body-medium-medium autosuggest__title">
                      {item.fullTitle}
                    </div>
                    <div className="text-body-small-regular autosuggest__author">
                      {item.creators.map((author) => {
                        if (numberOfAuthors <= 3) {
                          numberOfAuthors += 1;
                          return author.name;
                        }
                        return "et al.";
                      })}
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
