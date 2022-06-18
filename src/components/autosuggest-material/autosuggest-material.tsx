import { UseComboboxPropGetters } from "downshift";
import React from "react";
import {
  generateItemId,
  Suggestion,
  SuggestionWork
} from "../autosuggest-text/autosuggest-text";

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
      <li>
        <hr className="autosuggest__divider" />
      </li>
      <li>
        <ul className="autosuggest__item--materials">
          {/* eslint-disable react/jsx-props-no-spreading */}
          {/* The downshift combobox works this way by design */}
          {materialData.map((item, index) => {
            let numberOfAuthors = 0;
            return (
              <li
                className={`autosuggest__item--materials__item ${
                  highlightedIndex === index + textDataLength
                    ? "autosuggest__item--materials__item--highlight"
                    : ""
                }`}
                key={generateItemId(item)}
                {...getItemProps({ item, index })}
              >
                {/* eslint-enable react/jsx-props-no-spreading */}
                <div className="autosuggest__item--materials__item__content">
                  <div className="autosuggest__item--materials__item__content--cover">
                    <div className="material-container">
                      <a
                        className="material material--xsmall bg-identity-tint-120 material__animate"
                        href="google.com"
                      >
                        <img
                          src="https://imgcdn.saxo.com/_9781616550417/0x500"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div className="autosuggest__item--materials__item__content--info">
                    <div className="text-body-medium-medium autosuggest__item--materials__item__content--info__title">
                      {item.fullTitle}
                    </div>
                    <div className="text-body-small-regular autosuggest__item--materials__item__content--info__author">
                      {item.creators.map((author) => {
                        if (numberOfAuthors < 3) {
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
