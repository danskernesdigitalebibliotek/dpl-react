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
import { getAllPids } from "../../../apps/material/helper";

export interface MaterialButtonsProps {
  selectedManifestations: Manifestation[];
  size?: ButtonSize;
  workId: WorkId;
  dataCy?: string;
}

const MaterialButtons: FC<MaterialButtonsProps> = ({
  selectedManifestations,
  size,
  workId,
  dataCy = "material-buttons"
}) => {
  const faustIds = getAllPids(selectedManifestations).map((pid) =>
    convertPostIdToFaustId(pid)
  );
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
            />
            <MaterialButtonsFindOnShelf
              size={size}
              faustIds={faustIds}
              dataCy={`${dataCy}-find-on-shelf`}
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
