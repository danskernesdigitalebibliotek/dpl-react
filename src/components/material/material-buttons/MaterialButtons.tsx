import * as React from "react";
import { FC } from "react";
import { AccessTypeCode } from "../../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../../core/utils/helpers/general";
import { ButtonSize } from "../../../core/utils/types/button";
import { Manifestation } from "../../../core/utils/types/entities";
import { WorkId } from "../../../core/utils/types/ids";
import { hasCorrectAccessType } from "./helper";
import MaterialButtonsOnline from "./online/MaterialButtonsOnline";
import MaterialButtonsFindOnShelf from "./physical/MaterialButtonsFindOnShelf";
import MaterialButtonsPhysical from "./physical/MaterialButtonsPhysical";

export interface MaterialButtonsProps {
  manifestation: Manifestation;
  size?: ButtonSize;
  workId: WorkId;
}

const MaterialButtons: FC<MaterialButtonsProps> = ({
  manifestation,
  manifestation: { pid },
  size,
  workId
}) => {
  const faustId = convertPostIdToFaustId(pid);

  return (
    <>
      {hasCorrectAccessType(AccessTypeCode.Physical, manifestation) && (
        <>
          <MaterialButtonsPhysical manifestation={manifestation} size={size} />
          <MaterialButtonsFindOnShelf size={size} faustIds={[faustId]} />
        </>
      )}
      {hasCorrectAccessType(AccessTypeCode.Online, manifestation) && (
        <MaterialButtonsOnline
          manifestation={manifestation}
          size={size}
          workId={workId}
        />
      )}
    </>
  );
};

export default MaterialButtons;
