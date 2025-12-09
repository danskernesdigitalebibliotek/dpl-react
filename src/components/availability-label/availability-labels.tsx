import React from "react";
import {
  getAllFaustIds,
  getMaterialType,
  getMaterialTypes
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
  getAllIsbns
} from "../../apps/material/helper";

export interface AvailabilityLabelsProps {
  manifestations: Manifestation[];
  workId: WorkId;
  selectedManifestations?: Manifestation[];
  setSelectedManifestations?: (manifestations: Manifestation[]) => void;
  cursorPointer?: boolean;
}
export const AvailabilityLabels: React.FC<AvailabilityLabelsProps> = ({
  manifestations,
  workId,
  selectedManifestations,
  setSelectedManifestations,
  cursorPointer = false
}) => {
  const u = useUrls();
  const materialUrl = u("materialUrl");
  const allMaterialTypes = getMaterialTypes(manifestations);
  const manifestationsByMaterialType =
    divideManifestationsByMaterialType(manifestations);

  // Map over the distinct material types and assign manifestations of that type to each label
  return (
    <>
      {allMaterialTypes.map((materialType) => {
        const isTheOnlyLabel = allMaterialTypes.length === 1;
        const manifestationsOfMaterialType =
          manifestationsByMaterialType[materialType];
        const faustIds = getAllFaustIds(manifestationsOfMaterialType).sort();
        const isbns = getAllIsbns(manifestationsOfMaterialType);
        const url = constructMaterialUrl(materialUrl, workId, materialType);
        const accessTypesCodes = manifestationsOfMaterialType
          .map((manifest) =>
            manifest.accessTypes.map((accessType) => accessType.code)
          )
          .flat();

        const access = manifestationsOfMaterialType
          .map((manifest) => {
            return manifest.access.map((acc) => acc.__typename);
          })
          .flat();

        return (
          <AvailabilityLabel
            key={faustIds.join("-")}
            url={url}
            cursorPointer={cursorPointer}
            faustIds={faustIds}
            manifestText={materialType}
            accessTypes={accessTypesCodes}
            access={access}
            selected={
              selectedManifestations &&
              materialType === getMaterialType(selectedManifestations)
            }
            handleSelectManifestation={
              setSelectedManifestations
                ? () => {
                    setSelectedManifestations(manifestationsOfMaterialType);
                    setQueryParametersInUrl({
                      type: materialType
                    });
                  }
                : undefined
            }
            isbns={isbns}
            isVisualOnly={isTheOnlyLabel}
          />
        );
      })}
    </>
  );
};

export default {};
