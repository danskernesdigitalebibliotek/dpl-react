import React from "react";
import { ManifestationSimpleFragment } from "../../core/dbc-gateway/generated/graphql";
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
        const { pid, materialType } = manifestation;
        const matches = pid.match(/^[0-9]+-[a-z]+:([0-9]+)$/);
        if (matches?.[1]) {
          return (
            <AvailabilityLabel
              link="/"
              materialId={[matches[1]]}
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
