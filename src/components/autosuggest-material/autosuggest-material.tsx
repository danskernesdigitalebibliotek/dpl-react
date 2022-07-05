import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { Suggestion, Suggestions } from "../../core/utils/types/autosuggest";
import { generateItemId } from "../autosuggest-text/autosuggest-text";

export interface AutosuggestMaterialProps {
  materialData: Suggestions | [];
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
                  <div className="autosuggest__item--materials__item__content--info">
                    <div className="text-body-medium-medium autosuggest__item--materials__item__content--info__title">
                      {item.work?.titles.main[0]}
                    </div>
                    <div className="text-body-small-regular autosuggest__item--materials__item__content--info__author">
                      {item.work?.creators.map((author) => {
                        if (numberOfAuthors < 3) {
                          numberOfAuthors += 1;
                          return author.display;
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
