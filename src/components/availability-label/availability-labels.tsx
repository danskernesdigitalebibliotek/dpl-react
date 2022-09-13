import React from "react";
import { getManifestationType } from "../../apps/material/helper";
import {
  ManifestationsSimpleFieldsFragment,
  ManifestationsSimpleFragment
} from "../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import {
  constructMaterialUrl,
  setQueryParametersInUrl
} from "../../core/utils/helpers/url";
import { Pid, WorkId } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import { AvailabilityLabel } from "./availability-label";

export interface AvailabilityLabelsProps {
  manifestations: ManifestationsSimpleFragment;
  workId: WorkId;
  selectedManifestation?: ManifestationsSimpleFieldsFragment;
  selectManifestationHandler?: (
    manifestation: ManifestationsSimpleFieldsFragment
  ) => void;
  cursorPointer?: boolean;
}

export const AvailabiltityLabels: React.FC<AvailabilityLabelsProps> = ({
  manifestations,
  workId,
  selectedManifestation: manifestation,
  selectManifestationHandler,
  cursorPointer = false
}) => {
  const { materialUrl } = useUrls();

  return (
    <>
      {manifestations.all.map((item) => {
        const { pid, materialTypes } = item;
        const materialType = materialTypes[0].specific;
        const faustId = convertPostIdToFaustId(pid as Pid);
        const url = constructMaterialUrl(materialUrl, workId, materialType);

        return (
          <AvailabilityLabel
            key={pid}
            url={url}
            cursorPointer={cursorPointer}
            faustIds={[faustId]}
            manifestText={materialType}
            selected={
              manifestation &&
              materialType === getManifestationType(manifestation)
            }
            handleSelectManifestation={
              selectManifestationHandler
                ? () => {
                    selectManifestationHandler(item);
                    setQueryParametersInUrl({
                      type: materialType
                    });
                  }
                : undefined
            }
          />
        );
      })}
    </>
  );
};

export default {};
