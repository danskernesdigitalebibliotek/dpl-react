import React from "react";
import { ManifestationsSimpleFragment } from "../../core/dbc-gateway/generated/graphql";
import {
  convertPostIdToFaustId,
  slugify
} from "../../core/utils/helpers/general";
import { constructMaterialUrl } from "../../core/utils/helpers/url";
import { Pid, WorkId } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import { AvailabilityLabel } from "./availability-label";

export interface AvailabilityLabelsProps {
  manifestations: ManifestationsSimpleFragment;
  workId: WorkId;
  selectedType?: string | null;
  handleSelectType?: (type: string) => void;
}

export const AvailabiltityLabels: React.FC<AvailabilityLabelsProps> = ({
  manifestations,
  workId,
  selectedType,
  handleSelectType
}) => {
  const { materialUrl } = useUrls();

  return (
    <>
      {manifestations.all.map((manifestation) => {
        const { pid, materialTypes } = manifestation;
        const materialType = materialTypes[0].specific;
        const faustId = convertPostIdToFaustId(pid as Pid);
        const url = constructMaterialUrl(materialUrl, workId, materialType);

        const selected = slugify(materialType) === selectedType;

        if (!faustId) {
          return null;
        }

        // TODO: Make AvailabilityLabel use URL object instead of string.
        return (
          <AvailabilityLabel
            key={pid}
            url={url}
            faustIds={[faustId]}
            manifestText={materialType}
            selected={selected}
            handleSelectType={handleSelectType}
          />
        );
      })}
    </>
  );
};

export default {};
