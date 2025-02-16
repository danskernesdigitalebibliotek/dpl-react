import React, { FC } from "react";
import { Manifestation } from "../../../../core/utils/types/entities";
import MaterialSecondaryLink from "../generic/MaterialSecondaryLink";
import MaterialSecondaryButton from "../generic/MaterialSecondaryButton";
import { playerModalId } from "../../player-modal/helper";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import useReaderPlayer from "../../../../core/utils/useReaderPlayer";
import LinkButton from "../../../Buttons/LinkButton";
import { Button } from "../../../Buttons/Button";

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
  const { type, orderId, identifier } = useReaderPlayer(manifestations);

  const renderReaderButton = () => {
    if (orderId) {
      return (
        <LinkButton
          url={new URL(`/reader?orderid=${orderId}`, window.location.href)}
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

  const renderReaderTeaserButton = () => {
    if (orderId) return null;

    if (identifier) {
      return (
        <MaterialSecondaryLink
          label={t("onlineMaterialTeaserText", {
            placeholders: { "@materialType": t("ebookText") }
          })}
          size={size || "large"}
          url={
            new URL(`/reader?identifier=${identifier}`, window.location.href)
          }
          dataCy={`${dataCy}-reader-teaser`}
        />
      );
    }
    return null;
  };

  const renderPlayerButton = () => {
    if (orderId) {
      return (
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
      );
    }

    return null;
  };

  const renderPlayerTeaserButton = () => {
    if (orderId) return null;

    if (identifier) {
      return (
        <MaterialSecondaryButton
          label={t("onlineMaterialTeaserText", {
            placeholders: { "@materialType": t("audiobookText") }
          })}
          size={size || "large"}
          onClick={() => {
            open(playerModalId(identifier));
          }}
          dataCy={`${dataCy}-player-teaser`}
          ariaDescribedBy={t("onlineMaterialTeaserText")}
        />
      );
    }
    return null;
  };

  if (type === "reader") {
    return (
      <>
        {renderReaderButton()}
        {renderReaderTeaserButton()}
      </>
    );
  }

  if (type === "player") {
    return (
      <>
        {renderPlayerButton()}
        {renderPlayerTeaserButton()}
      </>
    );
  }

  return null;
};

export default MaterialButtonsOnlineInternal;
