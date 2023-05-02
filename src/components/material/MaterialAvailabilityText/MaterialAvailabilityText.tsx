import * as React from "react";
import { head } from "lodash";
import { getAllIdentifiers } from "../../../apps/material/helper";
import { AccessTypeCode } from "../../../core/dbc-gateway/generated/graphql";
import {
  getAllPids,
  getMaterialTypes
} from "../../../core/utils/helpers/general";
import { Manifestation } from "../../../core/utils/types/entities";
import { hasCorrectAccessType } from "../material-buttons/helper";
import MaterialAvailabilityTextOnline from "./online/MaterialAvailabilityTextOnline";
import MaterialAvailabilityTextPhysical from "./physical/MaterialAvailabilityTextPhysical";

interface Props {
  manifestations: Manifestation[];
}

const MaterialAvailabilityText: React.FC<Props> = ({ manifestations }) => {
  const materialType = head(getMaterialTypes(manifestations));

  if (hasCorrectAccessType(AccessTypeCode.Physical, manifestations)) {
    const pids = getAllPids(manifestations);
    return <MaterialAvailabilityTextPhysical pids={pids} />;
  }

  if (
    hasCorrectAccessType(AccessTypeCode.Online, manifestations) &&
    getAllIdentifiers(manifestations).length > 0 &&
    materialType
  ) {
    const isbns = getAllIdentifiers(manifestations);
    return (
      <MaterialAvailabilityTextOnline
        isbns={isbns}
        materialType={materialType}
      />
    );
  }

  return null;
};

export default MaterialAvailabilityText;
