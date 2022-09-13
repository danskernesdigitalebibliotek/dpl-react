import * as React from "react";
import { FC } from "react";
import { AccessTypeCode } from "../../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../../core/utils/helpers/general";
import { ButtonSize } from "../../../core/utils/types/button";
import { Manifestation } from "../../../core/utils/types/entities";
import MaterialButtonsOnline from "./online/MaterialButtonsOnline";
import MaterialButtonsFindOnShelf from "./physical/MaterialButtonsFindOnShelf";
import MaterialButtonsPhysical from "./physical/MaterialButtonsPhysical";

export interface MaterialButtonsProps {
  manifestation: Manifestation;
  size?: ButtonSize;
}

const MaterialButtons: FC<MaterialButtonsProps> = ({
  manifestation,
  manifestation: { pid },
  size
}) => {
  const hasPhysicalAccess = manifestation.accessTypes.some(
    (type) => type.code === AccessTypeCode.Physical
  );
  const faustId = convertPostIdToFaustId(pid);

  if (hasPhysicalAccess) {
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
