import { UseComboboxPropGetters } from "downshift";
import React from "react";
import { useText } from "../../core/utils/text";
import { Suggestion, Suggestions } from "../../core/utils/types/autosuggest";
import { Cover } from "../cover/cover";
import {
  creatorsToString,
  flattenCreators
} from "../../core/utils/helpers/general";
import { WorkSmallFragment } from "../../core/dbc-gateway/generated/graphql";

export interface AutosuggestMaterialProps {
  materialData: Suggestions | [];
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  highlightedIndex: number;
  textDataLength: number;
  dataCy?: string;
}

const AutosuggestMaterial: React.FC<AutosuggestMaterialProps> = ({
  materialData,
  getItemProps,
  highlightedIndex,
  textDataLength,
  dataCy = "autosuggest-material-item"
}) => {
  const t = useText();
  return (
    <li>
      <ul className="autosuggest__materials" role="listbox">
        {/* eslint-disable react/jsx-props-no-spreading */}
        {/* The downshift combobox works this way by design (line 54) */}
        {materialData.map((item, incorrectIndex) => {
          // incorrectIndex because in the whole of autosuggest dropdown it is
          // not the correct index for the item. We first need to add the length of
          // items from autosuggest string suggestion to it for it to be accurate (=> index)
          const index = incorrectIndex + textDataLength;
          const { work } = item;
          if (!work) {
            return null;
          }
          const { creators } = work;
          const authors = flattenCreators(
            creators as WorkSmallFragment["creators"]
          );

          return (
            <li
              className={`autosuggest__material ${
                highlightedIndex === index
                  ? "autosuggest__material--highlight"
                  : ""
              }`}
              key={item.work?.workId}
              {...getItemProps({ item, index })}
              data-cy={dataCy}
            >
              {/* eslint-enable react/jsx-props-no-spreading */}
              <div className="autosuggest__material__content">
                {item.work && (
                  <Cover
                    animate
                    size="xsmall"
                    id={item.work.manifestations.bestRepresentation.pid}
                    shadow
                  />
                )}

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
  );
};

export default AutosuggestMaterial;
