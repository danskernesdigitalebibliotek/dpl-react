import { UseComboboxPropGetters } from "downshift";
import React from "react";
import clsx from "clsx";
import { useText } from "../../core/utils/text";
import { Suggestion, Suggestions } from "../../core/utils/types/autosuggest";
import { Cover } from "../cover/cover";
import {
  creatorsToString,
  flattenCreators,
  getManifestationsPids
} from "../../core/utils/helpers/general";
import { WorkMediumFragment } from "../../core/dbc-gateway/generated/graphql";
import { getManifestationLanguageIsoCode } from "../../apps/material/helper";
import { Manifestation } from "../../core/utils/types/entities";
import { assertIsValidPid } from "../cover/helper";

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
        const {
          workId,
          titles,
          creators,
          manifestations: { all: allManifestations, bestRepresentation }
        } = work;
        const authors = flattenCreators(
          creators as WorkMediumFragment["creators"]
        );

        const manifestationLanguageIsoCode =
          bestRepresentation &&
          getManifestationLanguageIsoCode([bestRepresentation]);
        const coverPids = getManifestationsPids(
          (allManifestations ?? []) as Manifestation[]
        );
        const { pid } = bestRepresentation;
        const validPid = assertIsValidPid(pid);
        return (
          <li
            className={clsx("autosuggest__material-item", {
              "autosuggest__material-item--two": materialData.length === 2,
              "autosuggest__material-item--one": materialData.length === 1,
              "autosuggest__material-item--highlight":
                highlightedIndex === index
            })}
            key={workId}
            // TODO: Explicitly define prop types for better clarity
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getItemProps({ item, index })}
            data-cy={dataCy}
          >
            <div className="autosuggest__material-card">
              <Cover
                animate
                size="small"
                displaySize="xsmall"
                pid={validPid}
                shadow="small"
              />
              <div className="autosuggest__info">
                <div
                  lang={manifestationLanguageIsoCode}
                  className="text-body-medium-medium autosuggest__title"
                >
                  {titles.main[0]}
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
