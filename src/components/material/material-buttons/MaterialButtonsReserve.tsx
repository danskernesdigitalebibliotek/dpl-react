import * as React from "react";
import { FC } from "react";
import {
  AccessTypeCode,
  ManifestationsSimpleFieldsFragment
} from "../../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../../core/utils/helpers/general";
import { Pid } from "../../../core/utils/types/ids";
import MaterialButtonsReserveOnline from "./online/MaterialButtonsReserveOnline";
import MaterialButtonsReservePhysical from "./physical/MaterialButtonsReservePhysical";

export interface MaterialButtonsReserveProps {
  manifestation: ManifestationsSimpleFieldsFragment;
}

const MaterialButtonsReserve: FC<MaterialButtonsReserveProps> = ({
  manifestation
}) => {
  const { pid } = manifestation;
  const accessType = manifestation.accessTypes[0].code;
  const manifestationId = convertPostIdToFaustId(pid as Pid);

  if (accessType === AccessTypeCode.Physical) {
    return (
      <MaterialButtonsReservePhysical
        faustId={manifestationId as string}
        manifestation={manifestation}
      />
    );
  }

  return <MaterialButtonsReserveOnline manifestation={manifestation} />;
};

export default MaterialButtonsReserve;
