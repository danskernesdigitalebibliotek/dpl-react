import React, { FC } from "react";
import { useQueryClient } from "react-query";
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
  getGetV1UserLoansQueryKey,
  getGetV1UserReservationsQueryKey,
  usePostV1UserLoansIdentifier,
  usePostV1UserReservationsIdentifier
} from "../../../../core/publizon/publizon";
import {
  getAllFaustIds,
  getManifestationType
} from "../../../../core/utils/helpers/general";
import { useUrls } from "../../../../core/utils/url";
import { onlineInternalModalId } from "../../../../apps/material/helper";
import { usePatronData } from "../../../../core/utils/helpers/usePatronData";
import { OnlineInternalRequestStatus } from "../../../../core/utils/types/request";

type MaterialButtonsOnlineInternalType = {
  size?: ButtonSize;
  manifestations: Manifestation[];
  dataCy?: string;
  openModal: boolean;
  setReservationStatus?: (status: OnlineInternalRequestStatus) => void;
};

const MaterialButtonsOnlineInternal: FC<MaterialButtonsOnlineInternalType> = ({
  size,
  manifestations,
  dataCy = "material-button-online-publizon",
  openModal,
  setReservationStatus
}) => {
  const queryClient = useQueryClient();
  const t = useText();
  const u = useUrls();
  const authUrl = u("authUrl");
  const reservationsUrl = u("reservationsUrl");
  const { open, openGuarded } = useModalButtonHandler();
  const { mutate: mutateLoan } = usePostV1UserLoansIdentifier();
  const { mutate: mutateReservation } = usePostV1UserReservationsIdentifier();
  const {
    type,
    orderId,
    identifier,
    isAllReadyReservedButtonVisible,
    isMaterialLoanedButtonVisible,
    isLoanButtonVisible,
    isReserveButtonVisible
  } = useReaderPlayer(manifestations);
  const { data: userData } = usePatronData();

  const handleModalLoanReservation = () => {
    if (openModal) {
      openGuarded({
        authUrl,
        modalId: onlineInternalModalId(getAllFaustIds(manifestations))
      });
      return;
    }

    if (isLoanButtonVisible && identifier) {
      mutateLoan(
        { identifier },
        {
          onSuccess: () => {
            // Ensure that the button is updated after a successful loan
            queryClient.invalidateQueries(getGetV1UserLoansQueryKey());
            if (setReservationStatus) {
              setReservationStatus("loaned");
            }
          },
          onError: () => {
            if (setReservationStatus) {
              setReservationStatus("error");
            }
          }
        }
      );
      return;
    }

    if (isReserveButtonVisible && identifier && userData?.patron) {
      mutateReservation(
        {
          identifier,
          data: {
            email: userData.patron.emailAddress,
            // Only add phone number if it exists
            // Still waiting for the API to support optional phoneNumber
            ...(userData.patron.phoneNumber && {
              phoneNumber: userData.patron.phoneNumber.match(/^\+\d{2}/)
                ? userData.patron.phoneNumber // Keep the number unchanged if it already starts with +XX
                : `+45${userData.patron.phoneNumber}` // Prepend +45 if no country code is present
            })
          }
        },
        {
          onSuccess: () => {
            // Ensure that the button is updated after a successful reservation
            queryClient.invalidateQueries(getGetV1UserReservationsQueryKey());
            if (setReservationStatus) {
              setReservationStatus("reserved");
            }
          },
          onError: () => {
            if (setReservationStatus) {
              setReservationStatus("error");
            }
          }
        }
      );
    }
  };

  const manifestationType = getManifestationType(manifestations);
  const reseveLabel = openModal
    ? t("reserveWithMaterialTypeText", {
        placeholders: { "@materialType": manifestationType }
      })
    : t("approveReservationText");

  const loanLabel = openModal
    ? t("loanWithMaterialTypeText", {
        placeholders: { "@materialType": manifestationType }
      })
    : t("approveLoanText");

  const tryLabel = t("onlineMaterialTeaserText", {
    placeholders: { "@materialType": manifestationType }
  });

  const renderReaderButton = () => {
    if (!identifier) return null;

    if (isAllReadyReservedButtonVisible) {
      return (
        <LinkButton
          dataCy=""
          url={reservationsUrl}
          buttonType="none"
          size={size || "large"}
          variant="filled"
        >
          {t("onlineMaterialAlreadyReservedText")}
        </LinkButton>
      );
    }

    if (isMaterialLoanedButtonVisible && orderId) {
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

    if (isReserveButtonVisible || isLoanButtonVisible) {
      return (
        <Button
          dataCy={`${dataCy}-reader`}
          label={isReserveButtonVisible ? reseveLabel : loanLabel}
          buttonType="none"
          variant="filled"
          size={size || "large"}
          onClick={handleModalLoanReservation}
          disabled={false}
          collapsible={false}
        />
      );
    }

    return null;
  };

  const renderReaderTeaserButton = () => {
    if (isMaterialLoanedButtonVisible || !openModal) return null;

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

    if (isMaterialLoanedButtonVisible && orderId) {
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

    if (isReserveButtonVisible || isLoanButtonVisible) {
      return (
        <Button
          dataCy={`${dataCy}-player`}
          label={isReserveButtonVisible ? reseveLabel : loanLabel}
          buttonType="none"
          variant="filled"
          size={size || "large"}
          onClick={handleModalLoanReservation}
          disabled={false}
          collapsible={false}
        />
      );
    }

    return null;
  };

  const renderPlayerTeaserButton = () => {
    if (isMaterialLoanedButtonVisible || !openModal) return null;

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
