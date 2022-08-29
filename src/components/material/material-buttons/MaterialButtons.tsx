import * as React from "react";
import { FC } from "react";
import {
  AccessTypeCode,
  ManifestationsSimpleFieldsFragment
} from "../../../core/dbc-gateway/generated/graphql";
import MaterialButtonsOnline from "./online/MaterialButtonsOnline";
import MaterialButtonsPhysical from "./physical/MaterialButtonsPhysical";

export interface MaterialButtonsProps {
  manifestation: ManifestationsSimpleFieldsFragment;
}

const MaterialButtons: FC<MaterialButtonsProps> = ({ manifestation }) => {
  const hasPhysicalAccess = manifestation.accessTypes.some(
    (type) => type.code === AccessTypeCode.Physical
  );

  if (hasPhysicalAccess) {
    return <MaterialButtonsPhysical manifestation={manifestation} />;
  }

  return <MaterialButtonsOnline manifestation={manifestation} />;
};

export default MaterialButtons;
