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
  pid: Pid;
  manifestation?: ManifestationsSimpleFieldsFragment;
}

const MaterialButtonsReserve: FC<MaterialButtonsReserveProps> = ({
  pid,
  manifestation
}) => {
  if (!manifestation) {
    // No error handling necessary here, it is according to the specs
    return null;
  }

  const accessType = manifestation.accessTypes[0].code;
  const manifestationId = convertPostIdToFaustId(pid as Pid);

  // reserveable physically
  if (accessType === AccessTypeCode.Physical) {
    return (
      <MaterialButtonsReservePhysical
        faustId={manifestationId as string}
        manifestation={manifestation}
      />
    );
  }

  // reserveable online
  return <MaterialButtonsReserveOnline manifestation={manifestation} />;
};

export default MaterialButtonsReserve;
