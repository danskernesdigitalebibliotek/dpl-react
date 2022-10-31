import * as React from "react";
import { Manifestation } from "../../../core/utils/types/entities";
import MaterialAvailabilityTextOnline from "./online/MaterialAvailabilityTextOnline";
import MaterialAvailabilityTextPhysical from "./physical/MaterialAvailabilityTextPhysical";

interface Props {
  manifestation: Manifestation;
}

const MaterialAvailabilityText: React.FC<Props> = ({
  manifestation,
  manifestation: { pid, identifiers }
}) => {
  return (
    <>
      {manifestation.accessTypes.map((item) => {
        if (item.code === "PHYSICAL")
          return <MaterialAvailabilityTextPhysical pid={pid} />;
        if (item.code === "ONLINE" && identifiers.length > 0)
          return <MaterialAvailabilityTextOnline isbn={identifiers[0].value} />;
        return null;
      })}
    </>
  );
};

export default MaterialAvailabilityText;
