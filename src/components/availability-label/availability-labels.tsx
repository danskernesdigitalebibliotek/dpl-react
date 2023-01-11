import React from "react";
import {
  convertPostIdToFaustId,
  getManifestationType
} from "../../core/utils/helpers/general";
import {
  constructMaterialUrl,
  setQueryParametersInUrl
} from "../../core/utils/helpers/url";
import { WorkId } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import { AvailabilityLabel } from "./availability-label";
import { Manifestation } from "../../core/utils/types/entities";
import {
  divideManifestationsByMaterialType,
  getAllIdentifiers
} from "../../apps/material/helper";

export interface AvailabilityLabelsProps {
  manifestations: Manifestation[];
  workId: WorkId;
  selectedManifestations?: Manifestation[];
  setSelectedManifestations?: (manifestations: Manifestation[]) => void;
  cursorPointer?: boolean;
}

export const AvailabiltityLabels: React.FC<AvailabilityLabelsProps> = ({
  manifestations,
  workId,
  selectedManifestations,
  setSelectedManifestations,
  cursorPointer = false
}) => {
  const { materialUrl } = useUrls();
  // Divide manifestations into array of arrays based on material type.
  const manifestationsByMaterialType =
    divideManifestationsByMaterialType(manifestations);

  // Map over the outer array and send array of faust IDs to availability label component.
  return (
    <>
      {manifestationsByMaterialType.map((arrayOfManifestations) => {
        const pidArray = arrayOfManifestations.map((manifest) => manifest.pid);
        const faustIdArray = pidArray.map((pid) => convertPostIdToFaustId(pid));
        const materialType = arrayOfManifestations[0].materialTypes[0].specific;
        const identifiers = getAllIdentifiers(arrayOfManifestations);
        const url = constructMaterialUrl(materialUrl, workId, materialType);
        const accessTypesCodes = arrayOfManifestations
          .map((manifest) => {
            return manifest.accessTypes.map((accessType) => accessType.code);
          })
          .flat();

        return (
          <AvailabilityLabel
            key={materialType}
            url={url}
            cursorPointer={cursorPointer}
            faustIds={faustIdArray}
            manifestText={materialType}
            accessTypes={accessTypesCodes}
            selected={
              selectedManifestations &&
              materialType === getManifestationType(selectedManifestations[0])
            }
            handleSelectManifestation={
              setSelectedManifestations
                ? () => {
                    setSelectedManifestations(arrayOfManifestations);
                    setQueryParametersInUrl({
                      type: materialType
                    });
                  }
                : undefined
            }
            isbn={identifiers?.[0]}
          />
        );
      })}
    </>
  );
};

export default {};
