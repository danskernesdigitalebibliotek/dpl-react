import React from "react";
import { ManifestationsSimpleFragment } from "../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import {
  appendQueryParametersToUrl as addQueryParametersToPath,
  constructMaterialPath
} from "../../core/utils/helpers/url";
import { Pid, WorkId } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import { AvailabilityLabel } from "./availability-label";

export interface AvailabilityLabelsProps {
  manifestations: ManifestationsSimpleFragment;
  workId: WorkId;
}

export const AvailabiltityLabels: React.FC<AvailabilityLabelsProps> = ({
  manifestations,
  workId
}) => {
  const { materialUrl } = useUrls();

  return (
    <>
      {manifestations.all.map((manifestation) => {
        const { pid, materialTypes } = manifestation;
        const materialType = materialTypes[0].specific;
        const faustId = convertPostIdToFaustId(pid as Pid);
        const url = constructMaterialPath(materialUrl, workId, materialType);

        if (!faustId) {
          return null;
        }

        // TODO: Make AvailabilityLabel use URL object instead of string.
        return (
          <AvailabilityLabel
            key={pid}
            link={String(url)}
            faustIds={[faustId]}
            manifestText={materialType}
          />
        );
      })}
    </>
  );
};

export default {};
