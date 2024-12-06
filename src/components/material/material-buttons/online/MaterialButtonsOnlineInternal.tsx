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
import useReaderPlayerButtons from "../../../../core/utils/useReaderPlayerButtons";
import LinkButton from "../../../Buttons/LinkButton";
import { Button } from "../../../Buttons/Button";
import PlayerModal from "../../player-modal/PlayerModal";
// import { getManifestationType } from "../../../../core/utils/helpers/general";

type MaterialButtonsOnlineInternalType = {
  size?: ButtonSize;
  manifestations: Manifestation[];
  dataCy?: string;
};

const MaterialButtonsOnlineInternal: FC<MaterialButtonsOnlineInternalType> = ({
  size,
  manifestations,
  dataCy = "material-button-online-publizon"
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const { type, orderId, identifier, isLoading } =
    useReaderPlayerButtons(manifestations);

  // const testType = getManifestationType(manifestations);

  const renderReaderButton = () => {
    if (orderId && type === "reader") {
      return (
        <LinkButton
          url={new URL(`/reader?orderId=${orderId}`, window.location.href)}
          buttonType="none"
          variant="filled"
          size={size || "large"}
          dataCy={`${dataCy}-reader`}
        >
          {t("onlineMaterialReaderText", {
            placeholders: { "@materialType": t("ebookText") }
          })}
        </LinkButton>
      );
    }

    return null;
  };

  const renderPlayerButton = () => {
    if (orderId && type === "player") {
      return (
        <>
          <Button
            dataCy={`${dataCy}-player`}
            label={t("onlineMaterialPlayerText", {
              placeholders: { "@materialType": t("audiobookText") }
            })}
            buttonType="none"
            variant="filled"
            size={size || "large"}
            onClick={() => open(playerModalId(orderId))}
            disabled={false}
            collapsible={false}
          />
          <PlayerModal orderId={orderId} />
        </>
      );
    }

    return null;
  };

  if (hasReaderManifestation(manifestations)) {
    return (
      <>
        {renderReaderButton()}

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
      </>
    );
  }

  if (hasPlayerManifestation(manifestations)) {
    return (
      <>
        {renderPlayerButton()}

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

        <PlayerModal identifier={identifier} />
      </>
    );
  }

  return null;
};

export default MaterialButtonsOnlineInternal;
