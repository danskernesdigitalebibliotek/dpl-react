import * as React from "react";
import { ManifestationsSimpleFieldsFragment } from "../../../core/dbc-gateway/generated/graphql";
import { Pid } from "../../../core/utils/types/ids";
import MaterialAvailabilityTextOnline from "./online/MaterialAvailabilityTextOnline";
import MaterialAvailabilityTextPhysical from "./physical/MaterialAvailabilityTextPhysical";

interface Props {
  manifestation: ManifestationsSimpleFieldsFragment;
}

const MaterialAvailabilityText: React.FC<Props> = ({ manifestation }) => {
  return (
    <>
      {manifestation.accessTypes.map((item) => {
        if (item.code === "PHYSICAL")
          return (
            <MaterialAvailabilityTextPhysical pid={manifestation.pid as Pid} />
          );
        if (item.code === "ONLINE" && manifestation.identifiers)
          return (
            <MaterialAvailabilityTextOnline
              isbn={manifestation.identifiers?.[0].value}
            />
          );
        return null;
      })}
    </>
  );
};

export default MaterialAvailabilityText;
