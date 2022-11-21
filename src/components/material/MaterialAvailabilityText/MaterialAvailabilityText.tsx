import * as React from "react";
import { createJSXkey } from "../../../core/utils/helpers/general";
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
      {manifestation.accessTypes.map((item, i) => {
        const key = createJSXkey([item.code, i]);
        if (item.code === "PHYSICAL")
          return <MaterialAvailabilityTextPhysical key={key} pid={pid} />;
        if (item.code === "ONLINE" && identifiers.length > 0)
          return (
            <MaterialAvailabilityTextOnline
              key={key}
              isbn={identifiers[0].value}
            />
          );
        return null;
      })}
    </>
  );
};

export default MaterialAvailabilityText;
