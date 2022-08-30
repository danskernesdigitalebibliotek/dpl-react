import * as React from "react";
import { FC } from "react";
import {
  AccessTypeCode,
  ManifestationsSimpleFieldsFragment
} from "../../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../../core/utils/helpers/general";
import { Pid } from "../../../core/utils/types/ids";
import MaterialButtonsOnline from "./online/MaterialButtonsOnline";
import MaterialButtonsFindOnShelf from "./physical/MaterialButtonsFindOnShelf";
import MaterialButtonsPhysical from "./physical/MaterialButtonsPhysical";

export interface MaterialButtonsProps {
  manifestation: ManifestationsSimpleFieldsFragment;
}

const MaterialButtons: FC<MaterialButtonsProps> = ({ manifestation }) => {
  const hasPhysicalAccess = manifestation.accessTypes.some(
    (type) => type.code === AccessTypeCode.Physical
  );
  const faustId = convertPostIdToFaustId(manifestation.pid as Pid);

  if (hasPhysicalAccess) {
    return (
      <>
        <MaterialButtonsPhysical manifestation={manifestation} />
        <MaterialButtonsFindOnShelf isButton faustIds={[faustId as string]} />
      </>
    );
  }

  return <MaterialButtonsOnline manifestation={manifestation} />;
};

export default MaterialButtons;
