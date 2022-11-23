import * as React from "react";
import { FC } from "react";
import { AccessTypeCode } from "../../../core/dbc-gateway/generated/graphql";
import { convertPostIdToFaustId } from "../../../core/utils/helpers/general";
import { ButtonSize } from "../../../core/utils/types/button";
import { Manifestation } from "../../../core/utils/types/entities";
import { hasCorrectAccessType, isArticle } from "./helper";
import MaterialButtonsOnline from "./online/MaterialButtonsOnline";
import MaterialButtonsFindOnShelf from "./physical/MaterialButtonsFindOnShelf";
import MaterialButtonsPhysical from "./physical/MaterialButtonsPhysical";

export interface MaterialButtonsProps {
  manifestation: Manifestation;
  size?: ButtonSize;
  dataCy?: string;
}

const MaterialButtons: FC<MaterialButtonsProps> = ({
  manifestation,
  manifestation: { pid },
  size,
  dataCy = "material-buttons"
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
            />
            <MaterialButtonsFindOnShelf
              size={size}
              faustIds={[faustId]}
              dataCy={`${dataCy}-find-on-shelf`}
            />
          </>
        )}
      {hasCorrectAccessType(AccessTypeCode.Online, manifestation) && (
        <MaterialButtonsOnline
          manifestation={manifestation}
          size={size}
          dataCy={`${dataCy}-find-on-shelf`}
        />
      )}
    </>
  );
};

export default MaterialButtons;
