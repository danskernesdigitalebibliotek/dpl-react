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
import AvailabilityLabel from "./availability-label";
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

  return (
    <>
      {manifestations.map((item) => {
        const { pid, materialTypes, identifiers } = item;
        const materialType = materialTypes[0].specific;
        const faustId = convertPostIdToFaustId(pid);
        const url = constructMaterialUrl(materialUrl, workId, materialType);
        const accessTypesCodes = item.accessTypes.map((t) => t.code);
        return (
          <AvailabilityLabel
            key={pid}
            url={url}
            cursorPointer={cursorPointer}
            faustIds={[faustId]}
            manifestText={materialType}
            accessTypes={accessTypesCodes}
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
            isbn={identifiers?.[0]?.value}
          />
        );
      })}
    </>
  );
};

export default {};
