import * as React from "react";
import { getAllIdentifiers } from "../../../apps/material/helper";
import { getAllPids } from "../../../core/utils/helpers/general";
import { Manifestation } from "../../../core/utils/types/entities";
import MaterialAvailabilityTextOnline from "./online/MaterialAvailabilityTextOnline";
import MaterialAvailabilityTextPhysical from "./physical/MaterialAvailabilityTextPhysical";

interface Props {
  manifestations: Manifestation[];
}

const MaterialAvailabilityText: React.FC<Props> = ({ manifestations }) => {
  return (
    <>
      {/* We use the first manifestation because accessType shouldn't change between manifestations of the same material type. */}
      {manifestations[0].accessTypes.map((accessType) => {
        if (accessType.code === "PHYSICAL")
          return (
            <MaterialAvailabilityTextPhysical
              pids={getAllPids(manifestations)}
            />
          );
        if (
          accessType.code === "ONLINE" &&
          getAllIdentifiers(manifestations).length > 0
        )
          return (
            <MaterialAvailabilityTextOnline
              isbn={getAllIdentifiers(manifestations)[0]}
            />
          );
        return null;
      })}
    </>
  );
};

export default MaterialAvailabilityText;
