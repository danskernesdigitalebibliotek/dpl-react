import React from "react";
import { ManifestationsSimpleFragment } from "../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import {
  appendQueryParametersToPath as addQueryParametersToPath,
  getCurrentLocation
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
  console.log(getCurrentLocation());

  return (
    <>
      {manifestations.all.map((manifestation) => {
        const { pid, materialTypes } = manifestation;
        const materialType = materialTypes[0].specific;
        const faustId = convertPostIdToFaustId(pid as Pid);
        const url = addQueryParametersToPath(`${materialUrl}/${workId}`, {
          type: materialType
        });

        if (!faustId) {
          return null;
        }

        return (
          <AvailabilityLabel
            key={pid}
            link={url}
            faustIds={[faustId]}
            manifestText={materialType}
          />
        );
      })}
    </>
  );
};

export default {};
