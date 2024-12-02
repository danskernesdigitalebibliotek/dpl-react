import React, { FC } from "react";
import { Manifestation } from "../../../../core/utils/types/entities";
import {
  hasPlayerManifestation,
  hasReaderManifestation
} from "../../../reader-player/helper";
import MaterialSecondaryLink from "../generic/MaterialSecondaryLink";
import MaterialSecondaryButton from "../generic/MaterialSecondaryButton";
import { playerModalId } from "../../player-modal/helper";
import { getManifestationIsbn } from "../../../../apps/material/helper";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";

type MaterialButtonOnlinePublizonType = {
  size?: ButtonSize;
  manifestations: Manifestation[];
  dataCy?: string;
};

const MaterialButtonOnlinePublizon: FC<MaterialButtonOnlinePublizonType> = ({
  size,
  manifestations,
  dataCy = "material-button-online-publizon"
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();

  return (
    <>
      {/* Todo: add logic for the reservation / loan / Read / Listen buttons here */}

      {hasReaderManifestation(manifestations) && (
        <MaterialSecondaryLink
          label={t("onlineMaterialTeaserText", {
            placeholders: { "@materialType": t("ebookText") }
          })}
          size={size || "large"}
          url={
            new URL(
              `/reader?identifier=${getManifestationIsbn(manifestations[0])}`,
              window.location.href
            )
          }
          dataCy={`${dataCy}-reader-teaser`}
        />
      )}
      {hasPlayerManifestation(manifestations) && (
        <MaterialSecondaryButton
          label={t("onlineMaterialTeaserText", {
            placeholders: { "@materialType": t("audiobookText") }
          })}
          size={size || "large"}
          onClick={() => {
            open(playerModalId(getManifestationIsbn(manifestations[0])));
          }}
          dataCy={`${dataCy}-player-teaser`}
          ariaDescribedBy={t("onlineMaterialTeaserText")}
        />
      )}
    </>
  );
};

export default MaterialButtonOnlinePublizon;
