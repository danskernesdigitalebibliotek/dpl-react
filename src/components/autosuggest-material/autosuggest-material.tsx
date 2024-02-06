import { UseComboboxPropGetters } from "downshift";
import React from "react";
import clsx from "clsx";
import { useText } from "../../core/utils/text";
import { Suggestion, Suggestions } from "../../core/utils/types/autosuggest";
import { Cover } from "../cover/cover";
import {
  creatorsToString,
  flattenCreators
} from "../../core/utils/helpers/general";
import { WorkSmallFragment } from "../../core/dbc-gateway/generated/graphql";
import { getManifestationLanguageIsoCode } from "../../apps/material/helper";

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
    <>
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

        const manifestationLanguageIsoCode =
          item.work?.manifestations.bestRepresentation &&
          getManifestationLanguageIsoCode([
            item.work.manifestations.bestRepresentation
          ]);

        return (
          <li
            className={clsx("autosuggest__material-item", {
              "autosuggest__material-item--two": materialData.length === 2,
              "autosuggest__material-item--one": materialData.length === 1,
              "autosuggest__material-item--highlight":
                highlightedIndex === index
            })}
            key={item.work?.workId}
            {...getItemProps({ item, index })}
            data-cy={dataCy}
          >
            {/* eslint-enable react/jsx-props-no-spreading */}
            <div className="autosuggest__material-card">
              {item.work && (
                <Cover
                  animate
                  size="xsmall"
                  id={item.work.manifestations.bestRepresentation.pid}
                  shadow="small"
                />
              )}
              <div className="autosuggest__info">
                <div
                  lang={manifestationLanguageIsoCode}
                  className="text-body-medium-medium autosuggest__title"
                >
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
    </>
  );
};

export default AutosuggestMaterial;
