import * as React from "react";
import { FC } from "react";
import {
  AccessTypeCode,
  ManifestationsSimpleFieldsFragment
} from "../../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../../core/utils/helpers/general";
import { ButtonSize } from "../../../core/utils/types/button";
import { Pid } from "../../../core/utils/types/ids";
import MaterialButtonsOnline from "./online/MaterialButtonsOnline";
import MaterialButtonsFindOnShelf from "./physical/MaterialButtonsFindOnShelf";
import MaterialButtonsPhysical from "./physical/MaterialButtonsPhysical";

export interface MaterialButtonsProps {
  manifestation: ManifestationsSimpleFieldsFragment;
  size?: ButtonSize;
}

const MaterialButtons: FC<MaterialButtonsProps> = ({ manifestation, size }) => {
  const hasPhysicalAccess = manifestation.accessTypes.some(
    (type) => type.code === AccessTypeCode.Physical
  );
  const faustId = convertPostIdToFaustId(manifestation.pid as Pid);

  if (hasPhysicalAccess) {
    if (!faustId) {
      // TODO: handle error here once we do that
      return null;
    }
    return (
      <>
        <MaterialButtonsPhysical manifestation={manifestation} size={size} />
        <MaterialButtonsFindOnShelf size={size} faustIds={[faustId]} />
      </>
    );
  }

  return <MaterialButtonsOnline manifestation={manifestation} size={size} />;
};

export default MaterialButtons;
