import * as React from "react";
import { FC } from "react";
import {
  AccessTypeCode,
  ManifestationsSimpleFieldsFragment
} from "../../../core/dbc-gateway/generated/graphql";
import MaterialButtonsReserveOnline from "./online/MaterialButtonsReserveOnline";
import MaterialButtonsReservePhysical from "./physical/MaterialButtonsReservePhysical";

export interface MaterialButtonsReserveProps {
  manifestation: ManifestationsSimpleFieldsFragment;
}

const MaterialButtonsReserve: FC<MaterialButtonsReserveProps> = ({
  manifestation
}) => {
  const hasPhysicalAccess = manifestation.accessTypes.some(
    (type) => type.code === AccessTypeCode.Physical
  );

  if (hasPhysicalAccess) {
    return <MaterialButtonsReservePhysical manifestation={manifestation} />;
  }

  return <MaterialButtonsReserveOnline manifestation={manifestation} />;
};

export default MaterialButtonsReserve;
