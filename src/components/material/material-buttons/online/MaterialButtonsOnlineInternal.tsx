import React, { FC, useState } from "react";
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
import { getMaterialType } from "../../../../core/utils/helpers/general";
import { RequestStatus } from "../../../../core/utils/types/request";
import DeleteReservationModal, {
  deleteReservationModalId
} from "../../../../apps/reservation-list/modal/delete-reservation/delete-reservation-modal";
import { ReservationType } from "../../../../core/utils/types/reservation-type";
import useOnlineInternalHandleLoanReservation from "../../../../core/utils/useOnlineInternalHandleLoanReservation";
import { ApiResult, CreateLoanResult } from "../../../../core/publizon/model";
import { getFirstManifestation } from "../../../../apps/material/helper";
import { WorkId } from "../../../../core/utils/types/ids";
import { useEventStatistics } from "../../../../core/statistics/useStatistics";
import { statistics } from "../../../../core/statistics/statistics";
import PlayerModal from "../../player-modal/PlayerModal";
import MaterialButtonLoading from "../generic/MaterialButtonLoading";

type MaterialButtonsOnlineInternalType = {
  size?: ButtonSize;
  manifestations: Manifestation[];
  dataCy?: string;
  openModal: boolean;
  setReservationStatus?: (status: RequestStatus) => void;
  setLoanResponse?: (response: CreateLoanResult | null) => void;
  setLoanStatus?: (status: RequestStatus) => void;
  setReservationOrLoanErrorResponse?: (error: ApiResult) => void;
  workId: WorkId;
};

const MaterialButtonsOnlineInternal: FC<MaterialButtonsOnlineInternalType> = ({
  size,
  manifestations,
  dataCy = "material-button-online-internal",
  openModal,
  setReservationStatus,
  setLoanResponse,
  setLoanStatus,
  setReservationOrLoanErrorResponse,
  workId
}) => {
  const { track } = useEventStatistics();
  const t = useText();
  const { open } = useModalButtonHandler();
  const {
    type,
    orderId,
    identifier,
    isAlreadyReserved,
    isAlreadyLoaned,
    canBeLoaned,
    canBeReserved,
    reservation
  } = useReaderPlayer(getFirstManifestation(manifestations));
  const handleModalLoanReservation = useOnlineInternalHandleLoanReservation({
    manifestations,
    openModal,
    setReservationStatus,
    setLoanResponse,
    setLoanStatus,
    setReservationOrLoanErrorResponse,
    workId
  });
  const [reservationToDelete, setReservationToDelete] =
    useState<ReservationType | null>(null);

  const manifestationType = getMaterialType(manifestations);
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
    if (!identifier) return <MaterialButtonLoading />;

    if (isAlreadyReserved && reservation) {
      return (
        <>
          <Button
            dataCy="remove-digital-reservation-button"
            label={t("reservationDetailsRemoveDigitalReservationText")}
            buttonType="none"
            size={size || "large"}
            variant="filled"
            collapsible={false}
            disabled={false}
            onClick={() => {
              setReservationToDelete(reservation);
              open(deleteReservationModalId(reservation));
            }}
          />
        </>
      );
    }

    if (isAlreadyLoaned && orderId) {
      return (
        <LinkButton
          url={new URL(`/reader?orderid=${orderId}`, window.location.href)}
          buttonType="none"
          variant="filled"
          size={size || "large"}
          dataCy={`${dataCy}-reader`}
          trackClick={() =>
            track("click", {
              id: statistics.publizonReadListen.id,
              name: statistics.publizonReadListen.name,
              trackedData: workId
            })
          }
        >
          {t("onlineMaterialReaderText", {
            placeholders: { "@materialType": manifestationType }
          })}
        </LinkButton>
      );
    }

    if (canBeReserved || canBeLoaned) {
      return (
        <Button
          dataCy={`${dataCy}-reader`}
          label={canBeReserved ? reseveLabel : loanLabel}
          buttonType="none"
          variant="filled"
          size={size || "large"}
          onClick={handleModalLoanReservation}
          disabled={false}
          collapsible={false}
        />
      );
    }

    return <MaterialButtonLoading />;
  };

  const renderReaderTeaserButton = () => {
    // Don't show teaser if already loaned or not in modal view
    if (isAlreadyLoaned || !openModal) return null;

    if (identifier) {
      return (
        <MaterialSecondaryLink
          label={tryLabel}
          size={size || "large"}
          url={
            new URL(`/reader?identifier=${identifier}`, window.location.href)
          }
          dataCy={`${dataCy}-reader-teaser`}
          trackClick={() =>
            track("click", {
              id: statistics.publizonTry.id,
              name: statistics.publizonTry.name,
              trackedData: workId
            })
          }
        />
      );
    }
    // Show loading only if we don't have identifier yet
    return <MaterialButtonLoading />;
  };

  const renderPlayerButton = () => {
    if (!identifier) return <MaterialButtonLoading />;

    if (isAlreadyReserved && reservation) {
      return (
        <>
          <Button
            dataCy="remove-digital-reservation-button"
            label={t("reservationDetailsRemoveDigitalReservationText")}
            buttonType="none"
            size={size || "large"}
            variant="filled"
            collapsible={false}
            disabled={false}
            onClick={() => {
              setReservationToDelete(reservation);
              open(deleteReservationModalId(reservation));
            }}
          />
        </>
      );
    }

    if (isAlreadyLoaned && orderId) {
      return (
        <>
          <PlayerModal orderId={orderId} />
          <Button
            dataCy={`${dataCy}-player`}
            label={t("onlineMaterialPlayerText", {
              placeholders: { "@materialType": manifestationType }
            })}
            buttonType="none"
            variant="filled"
            size={size || "large"}
            onClick={() => {
              track("click", {
                id: statistics.publizonReadListen.id,
                name: statistics.publizonReadListen.name,
                trackedData: workId
              });
              open(playerModalId(orderId));
            }}
            disabled={false}
            collapsible={false}
          />
        </>
      );
    }

    if (canBeReserved || canBeLoaned) {
      return (
        <Button
          dataCy={`${dataCy}-player`}
          label={canBeReserved ? reseveLabel : loanLabel}
          buttonType="none"
          variant="filled"
          size={size || "large"}
          onClick={handleModalLoanReservation}
          disabled={false}
          collapsible={false}
        />
      );
    }

    return <MaterialButtonLoading />;
  };

  const renderPlayerTeaserButton = () => {
    // Don't show teaser if already loaned or not in modal view
    if (isAlreadyLoaned || !openModal) return null;

    if (identifier) {
      return (
        <>
          <PlayerModal identifier={identifier} />
          <MaterialSecondaryButton
            label={tryLabel}
            size={size || "large"}
            onClick={() => {
              track("click", {
                id: statistics.publizonTry.id,
                name: statistics.publizonTry.name,
                trackedData: workId
              });
              open(playerModalId(identifier));
            }}
            dataCy={`${dataCy}-player-teaser`}
            ariaDescribedBy={t("onlineMaterialTeaserText")}
          />
        </>
      );
    }
    // Show loading only if we don't have identifier yet
    return <MaterialButtonLoading />;
  };

  const renderDeleteReservationModal = () => {
    if (!reservationToDelete) return null;

    return (
      <DeleteReservationModal
        modalId={deleteReservationModalId(reservationToDelete)}
        reservations={[reservationToDelete]}
      />
    );
  };

  if (type === "reader") {
    return (
      <>
        {renderReaderButton()}
        {renderReaderTeaserButton()}
        {renderDeleteReservationModal()}
      </>
    );
  }

  if (type === "player") {
    return (
      <>
        {renderPlayerButton()}
        {renderPlayerTeaserButton()}
        {renderDeleteReservationModal()}
      </>
    );
  }

  return null;
};

export default MaterialButtonsOnlineInternal;
