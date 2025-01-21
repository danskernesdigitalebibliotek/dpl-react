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
import {
  usePostV1UserLoansIdentifier,
  usePostV1UserReservationsIdentifier
} from "../../../../core/publizon/publizon";
import { getManifestationType } from "../../../../core/utils/helpers/general";

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
  const { mutate: mutateLoan } = usePostV1UserLoansIdentifier();
  const { mutate: mutateReservation } = usePostV1UserReservationsIdentifier();
  const {
    type,
    orderId,
    identifier,
    showMaterialButton,
    showLoanButton,
    showReserveButton
  } = useReaderPlayer(manifestations);

  const manifestationType = getManifestationType(manifestations);
  const reseveLabel =
    size === "small"
      ? t("reserveText")
      : `${t("reserveWithMaterialTypeText", {
          placeholders: { "@materialType": manifestationType }
        })}`;

  const loanLabel =
    size === "small"
      ? t("reserveText")
      : `${t("loanWithMaterialTypeText", {
          placeholders: { "@materialType": manifestationType }
        })}`;

  const tryLabel = t("onlineMaterialTeaserText", {
    placeholders: { "@materialType": manifestationType }
  });

  const renderReaderButton = () => {
    if (!identifier) return null;

    if (showMaterialButton && orderId) {
      return (
        <LinkButton
          url={new URL(`/reader?orderid=${orderId}`, window.location.href)}
          buttonType="none"
          variant="filled"
          size={size || "large"}
          dataCy={`${dataCy}-reader`}
        >
          {t("onlineMaterialReaderText", {
            placeholders: { "@materialType": manifestationType }
          })}
        </LinkButton>
      );
    }

    if (showLoanButton) {
      return (
        <Button
          dataCy={`${dataCy}-reader`}
          label={loanLabel}
          buttonType="none"
          variant="filled"
          size={size || "large"}
          onClick={() => mutateLoan({ identifier })}
          disabled={false}
          collapsible={false}
        />
      );
    }

    if (showReserveButton) {
      return (
        <Button
          dataCy={`${dataCy}-reader`}
          label={reseveLabel}
          buttonType="none"
          variant="filled"
          size={size || "large"}
          onClick={() =>
            mutateReservation({
              identifier,
              data: {
                email: "",
                phoneNumber: "+45"
              }
            })
          }
          disabled={false}
          collapsible={false}
        />
      );
    }

    return null;
  };

  const renderReaderTeaserButton = () => {
    if (showMaterialButton) return null;

    if (identifier) {
      return (
        <MaterialSecondaryLink
          label={tryLabel}
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
    if (!identifier) return null;

    if (showMaterialButton && orderId) {
      return (
        <Button
          dataCy={`${dataCy}-player`}
          label={t("onlineMaterialPlayerText", {
            placeholders: { "@materialType": manifestationType }
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

    if (showLoanButton) {
      return (
        <Button
          dataCy={`${dataCy}-player`}
          label={loanLabel}
          buttonType="none"
          variant="filled"
          size={size || "large"}
          onClick={() => mutateLoan({ identifier })}
          disabled={false}
          collapsible={false}
        />
      );
    }

    if (showReserveButton) {
      return (
        <Button
          dataCy={`${dataCy}-player`}
          label={reseveLabel}
          buttonType="none"
          variant="filled"
          size={size || "large"}
          onClick={() =>
            mutateReservation({
              identifier,
              data: {
                email: "",
                phoneNumber: "+45"
              }
            })
          }
          disabled={false}
          collapsible={false}
        />
      );
    }

    return null;
  };

  const renderPlayerTeaserButton = () => {
    if (showMaterialButton) return null;

    if (identifier) {
      return (
        <MaterialSecondaryButton
          label={tryLabel}
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
