import React from "react";
import { ManifestationsSimpleFragment } from "../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../core/utils/helpers";
import { Pid } from "../../core/utils/types/ids";
import { AvailabilityLabel } from "./availability-label";

export interface AvailabilityLabelsProps {
  manifestations: ManifestationsSimpleFragment;
}

export const AvailabiltityLabels: React.FC<AvailabilityLabelsProps> = ({
  manifestations
}) => {
  return (
    <>
      {manifestations.all.map((manifestation) => {
        const { pid, materialTypes } = manifestation;
        const faustId = convertPostIdToFaustId(pid as Pid);
        if (faustId) {
          return (
            <AvailabilityLabel
              key={pid}
              link="/"
              faustIds={[faustId]}
              manifestText={materialTypes[0].specific}
            />
          );
        }

        return null;
      })}
    </>
  );
};

export default {};
