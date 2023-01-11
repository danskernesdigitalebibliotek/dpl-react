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
  selectedManifestations: Manifestation[];
  size?: ButtonSize;
  workId: WorkId;
  dataCy?: string;
  isMain?: boolean;
}

const MaterialButtons: FC<MaterialButtonsProps> = ({
  selectedManifestations,
  size,
  workId,
  dataCy = "material-buttons",
  isMain
}) => {
  const faustId = convertPostIdToFaustId(selectedManifestations[0].pid);

  // We don't want to show physical buttons/find on shelf for articles because
  // articles appear as a part of journal/periodical publications and can't be
  // physically loaned for themseleves.
  return (
    <>
      {hasCorrectAccessType(AccessTypeCode.Physical, selectedManifestations) &&
        !isArticle(selectedManifestations) && (
          <>
            <MaterialButtonsPhysical
              selectedManifestations={selectedManifestations}
              size={size}
              dataCy={`${dataCy}-physical`}
              isMain={isMain}
            />
            <MaterialButtonsFindOnShelf
              size={size}
              faustId={faustId}
              dataCy={`${dataCy}-find-on-shelf`}
              isMain={isMain}
            />
          </>
        )}
      {(hasCorrectAccessType(AccessTypeCode.Online, selectedManifestations) ||
        hasCorrectAccess("DigitalArticleService", selectedManifestations)) && (
        <MaterialButtonsOnline
          selectedManifestations={selectedManifestations}
          size={size}
          workId={workId}
          dataCy={`${dataCy}-online`}
        />
      )}
    </>
  );
};

export default MaterialButtons;
