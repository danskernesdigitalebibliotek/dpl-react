import * as React from "react";
import { FC } from "react";
import { AccessTypeCodeEnum } from "../../../core/dbc-gateway/generated/graphql";
import {
  getAllFaustIds,
  getMaterialType
} from "../../../core/utils/helpers/general";
import { ButtonSize } from "../../../core/utils/types/button";
import { Manifestation } from "../../../core/utils/types/entities";
import { hasCorrectAccess, hasCorrectAccessType, isArticle } from "./helper";
import { WorkId } from "../../../core/utils/types/ids";
import MaterialButtonsOnline from "./online/MaterialButtonsOnline";
import MaterialButtonsFindOnShelf from "./physical/MaterialButtonsFindOnShelf";
import MaterialButtonsPhysical from "./physical/MaterialButtonsPhysical";
import MaterialButtonReservableFromAnotherLibrary from "./physical/MaterialButtonReservableFromAnotherLibrary";
import useReservableFromAnotherLibrary from "../../../core/utils/useReservableFromAnotherLibrary";

export interface MaterialButtonsProps {
  manifestations: Manifestation[];
  size?: ButtonSize;
  workId: WorkId;
  dataCy?: string;
  materialTitleId: string;
  isSpecificManifestation?: boolean;
}

const MaterialButtons: FC<MaterialButtonsProps> = ({
  manifestations,
  size,
  workId,
  dataCy = "material-buttons",
  materialTitleId,
  isSpecificManifestation = false
}) => {
  const faustIds = getAllFaustIds(manifestations);
  // We don't want to show physical buttons/find on shelf for articles because
  // articles appear as a part of journal/periodical publications and can't be
  // physically loaned for themseleves.

  const { materialIsReservableFromAnotherLibrary } =
    useReservableFromAnotherLibrary(manifestations);

  if (materialIsReservableFromAnotherLibrary) {
    return (
      <MaterialButtonReservableFromAnotherLibrary
        size={size}
        manifestationMaterialType={getMaterialType(manifestations)}
        faustIds={faustIds}
      />
    );
  }

  return (
    <>
      {hasCorrectAccessType(AccessTypeCodeEnum.Physical, manifestations) &&
        !isArticle(manifestations) && (
          <>
            <MaterialButtonsPhysical
              manifestations={manifestations}
              size={size}
              dataCy={`${dataCy}-physical`}
              isSpecificManifestation={isSpecificManifestation}
            />
            <MaterialButtonsFindOnShelf
              size={size}
              faustIds={faustIds}
              dataCy={`${dataCy}-find-on-shelf`}
              workId={workId}
            />
          </>
        )}
      {(hasCorrectAccessType(AccessTypeCodeEnum.Online, manifestations) ||
        hasCorrectAccess("DigitalArticleService", manifestations)) && (
        <MaterialButtonsOnline
          manifestations={manifestations}
          size={size}
          workId={workId}
          dataCy={`${dataCy}-online`}
          ariaLabelledBy={materialTitleId}
        />
      )}
    </>
  );
};

export default MaterialButtons;
