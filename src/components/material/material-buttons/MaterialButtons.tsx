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
  isSpecificManifestation?: boolean;
  manifestations: Manifestation[];
  size?: ButtonSize;
  workId: WorkId;
  dataCy?: string;
  materialTitleId: string;
  isEditionPicker?: boolean;
}

const MaterialButtons: FC<MaterialButtonsProps> = ({
  isSpecificManifestation = false,
  manifestations,
  size,
  workId,
  dataCy = "material-buttons",
  materialTitleId,
  isEditionPicker = false
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
        workId={workId}
        size={size}
        manifestationMaterialType={getMaterialType(manifestations)}
        faustIds={faustIds}
      />
    );
  }
  const showPhysicalButtons =
    hasCorrectAccessType(AccessTypeCodeEnum.Physical, manifestations) &&
    !isArticle(manifestations);
  // Show online material buttons if, either the material has an online access type or it has
  // a DigitalArticleService access & at the same time is an article. This way
  // we avoid showing both physical and online action buttons at one, which shouldn't happen
  const showOnlineButtons =
    hasCorrectAccessType(AccessTypeCodeEnum.Online, manifestations) ||
    (hasCorrectAccess("DigitalArticleService", manifestations) &&
      isArticle(manifestations));

  return (
    <>
      {showPhysicalButtons && (
        <>
          <MaterialButtonsPhysical
            manifestations={manifestations}
            size={size}
            dataCy={`${dataCy}-physical`}
            isSpecificManifestation={isSpecificManifestation}
            isEditionPicker={isEditionPicker}
          />
          {!isEditionPicker && (
            <MaterialButtonsFindOnShelf
              size={size}
              faustIds={faustIds}
              dataCy={`${dataCy}-find-on-shelf`}
              workId={workId}
            />
          )}
        </>
      )}
      {showOnlineButtons && (
        <MaterialButtonsOnline
          manifestations={manifestations}
          size={size}
          workId={workId}
          dataCy={`${dataCy}-online`}
          ariaLabelledBy={materialTitleId}
          isEditionPicker={isEditionPicker}
        />
      )}
    </>
  );
};

export default MaterialButtons;
