import React from "react";
import { uniq } from "lodash";
import { getManifestationType } from "../../apps/material/helper";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import {
  constructMaterialUrl,
  setQueryParametersInUrl
} from "../../core/utils/helpers/url";
import { WorkId } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import { AvailabilityLabel } from "./availability-label";
import { Manifestation } from "../../core/utils/types/entities";

export interface AvailabilityLabelsProps {
  manifestations: Manifestation[];
  workId: WorkId;
  selectedManifestation?: Manifestation;
  selectManifestationHandler?: (manifestation: Manifestation) => void;
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

  // Find out what unique material types there are for the manifestation.
  const allMaterialTypes = manifestations
    .map((manifest) => manifest.materialTypes.map((type) => type.specific))
    .flat();
  const uniqueMaterialTypes = uniq(allMaterialTypes);

  // Divide manifestations into array of arrays based on material type.
  const manifestationsByMaterialType = uniqueMaterialTypes.map(
    (uniqueMaterialType) => {
      return manifestations.filter((manifest) => {
        const manifestationMaterialTypes = manifest.materialTypes.map(
          (materialType) => materialType.specific
        );
        return manifestationMaterialTypes.includes(uniqueMaterialType);
      });
    }
  );

  // Map over the outer array and send array of faust IDs to availability label component.
  return (
    <>
      {manifestationsByMaterialType.map((arrayOfManifestations) => {
        const pidArray = arrayOfManifestations.map((manifest) => manifest.pid);
        const faustIdArray = pidArray.map((pid) => convertPostIdToFaustId(pid));
        const materialType = arrayOfManifestations[0].materialTypes[0].specific;
        const identifiers = arrayOfManifestations
          .map((manifest) =>
            manifest.identifiers.map((identifier) => identifier.value)
          )
          .flat();
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
              manifestation &&
              materialType === getManifestationType(manifestation)
            }
            handleSelectManifestation={
              selectManifestationHandler
                ? () => {
                    selectManifestationHandler(manifestations[0]);
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
