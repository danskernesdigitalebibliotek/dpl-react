import * as React from "react";
import { FC } from "react";
import { AccessTypeCode } from "../../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../../core/utils/helpers/general";
import { ButtonSize } from "../../../core/utils/types/button";
import { Manifestation } from "../../../core/utils/types/entities";
import { hasCorrectAccess, hasCorrectAccessType, isArticle } from "./helper";
import { WorkId } from "../../../core/utils/types/ids";
import MaterialButtonsOnline from "./online/MaterialButtonsOnline";
import MaterialButtonsFindOnShelf from "./physical/MaterialButtonsFindOnShelf";
import MaterialButtonsPhysical from "./physical/MaterialButtonsPhysical";

export interface MaterialButtonsProps {
  manifestation: Manifestation;
  size?: ButtonSize;
  workId: WorkId;
  dataCy?: string;
  isMainButton?: boolean;
}

const MaterialButtons: FC<MaterialButtonsProps> = ({
  manifestation,
  manifestation: { pid },
  size,
  workId,
  dataCy = "material-buttons",
  isMainButton
}) => {
  const faustId = convertPostIdToFaustId(pid);

  // We don't want to show physical buttons/find on shelf for articles because
  // articles appear as a part of journal/periodical publications and can't be
  // physically loaned for themseleves.
  return (
    <>
      {hasCorrectAccessType(AccessTypeCode.Physical, manifestation) &&
        !isArticle(manifestation) && (
          <>
            <MaterialButtonsPhysical
              manifestation={manifestation}
              size={size}
              dataCy={`${dataCy}-physical`}
              isMainButton={isMainButton}
            />
            <MaterialButtonsFindOnShelf
              size={size}
              faustIds={[faustId]}
              dataCy={`${dataCy}-find-on-shelf`}
              isMainButton={isMainButton}
            />
          </>
        )}
      {(hasCorrectAccessType(AccessTypeCode.Online, manifestation) ||
        hasCorrectAccess("DigitalArticleService", manifestation)) && (
        <MaterialButtonsOnline
          manifestation={manifestation}
          size={size}
          workId={workId}
          dataCy={`${dataCy}-find-on-shelf`}
        />
      )}
    </>
  );
};

export default MaterialButtons;
