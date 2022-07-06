import React from "react";
import { ManifestationSimpleFragment } from "../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../core/utils/helpers";
import { Pid } from "../../core/utils/types/ids";
import { AvailabilityLabel } from "./availability-label";

export interface AvailabilityLabelsProps {
  manifestations: ManifestationSimpleFragment[];
}

export const AvailabiltityLabels: React.FC<AvailabilityLabelsProps> = ({
  manifestations
}) => {
  return (
    <>
      {manifestations.map((manifestation) => {
        const { pid, materialType } = manifestation as {
          pid: Pid;
          materialType: string;
        };
        const faustId = convertPostIdToFaustId(pid);
        if (faustId) {
          return (
            <AvailabilityLabel
              link="/"
              faustIds={[faustId]}
              manifestText={materialType}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export default {};
