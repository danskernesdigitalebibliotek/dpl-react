import * as React from "react";
import { getAllIdentifiers } from "../../../apps/material/helper";
import { AccessTypeCode } from "../../../core/dbc-gateway/generated/graphql";
import { getAllPids } from "../../../core/utils/helpers/general";
import { Manifestation } from "../../../core/utils/types/entities";
import { hasCorrectAccessType } from "../material-buttons/helper";
import MaterialAvailabilityTextOnline from "./online/MaterialAvailabilityTextOnline";
import MaterialAvailabilityTextPhysical from "./physical/MaterialAvailabilityTextPhysical";

interface Props {
  manifestations: Manifestation[];
}

const MaterialAvailabilityText: React.FC<Props> = ({ manifestations }) => {
  return (
    <>
      {hasCorrectAccessType(AccessTypeCode.Physical, manifestations) && (
        <MaterialAvailabilityTextPhysical pids={getAllPids(manifestations)} />
      )}
      {hasCorrectAccessType(AccessTypeCode.Online, manifestations) &&
        getAllIdentifiers(manifestations).length > 0 && (
          <MaterialAvailabilityTextOnline
            isbns={getAllIdentifiers(manifestations)}
          />
        )}
    </>
  );
};

export default MaterialAvailabilityText;
