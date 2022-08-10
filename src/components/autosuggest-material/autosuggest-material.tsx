import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { useText } from "../../core/utils/text";
import { generateItemId } from "../autosuggest-text/autosuggest-text";
import { Suggestion, Suggestions } from "../../core/utils/types/autosuggest";
import { Cover } from "../cover/cover";
import { creatorsToString } from "../../core/utils/helpers/general";
import { Pid } from "../../core/utils/types/ids";

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
  const t = useText();
  if (materialData.length < 1) {
    return null;
  }
  return (
    <>
      <li className="autosuggest__divider" />
      <li>
        <ul className="autosuggest__materials">
          {/* eslint-disable react/jsx-props-no-spreading */}
          {/* The downshift combobox works this way by design (line 50) */}
          {/* incorrectIndex because in the whole of autosuggest dropdown it is
          not the correct index for the item. We first need to add the length of
          items from autosuggest string suggestion to it for it to be accurate */}
          {materialData.map((item, incorrectIndex) => {
            const index = incorrectIndex + textDataLength;
            const authors: string[] = [];
            item.work?.creators.forEach((creator) => {
              authors.push(creator.display);
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
                    {item.work && (
                      <Cover
                        animate
                        size="xsmall"
                        pid={item.work.manifestations.first.pid as Pid}
                      />
                    )}
                  </div>
                  <div className="autosuggest__info">
                    <div className="text-body-medium-medium autosuggest__title">
                      {item.work?.titles.main[0]}
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
