import React, { FC, useCallback } from "react";
import ExternalLinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg";
import { Link } from "../../../../components/atoms/link";
import { useText } from "../../../../core/utils/text";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";
import { useDeleteV1UserReservationsIdentifier } from "../../../../core/publizon/publizon";
import DeleteReservationModal from "../delete-reservation/delete-reservation-modal";
import { getModalIds } from "../../../../core/utils/helpers/general";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useUrls } from "../../../../core/utils/url";

export interface ReservationDetailsRedirectProps {
  reservationId: string;
}

const ReservationDetailsRedirect: FC<
  ReservationDetailsRedirectProps & MaterialProps
> = ({ reservationId }) => {
  const t = useText();
  const { ereolenMyPageUrl } = useUrls();
  const { mutate } = useDeleteV1UserReservationsIdentifier();
  const { open, close } = useModalButtonHandler();
  const modalIds = getModalIds();
  const modalId = `${modalIds.deleteReservation}${reservationId}`;

  const deleteReservation = useCallback(() => {
    if (reservationId) {
      mutate(
        {
          identifier: reservationId
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onSuccess: (result) => {
            close(modalId);
          },
          // todo error handling, missing in figma
          onError: () => {
            close(modalId);
          }
        }
      );
    }
  }, [close, modalId, mutate, reservationId]);

  return (
    <>
      <div className="modal-details__buttons">
        <button
          type="button"
          onClick={() => open(modalId)}
          className="link-tag mx-16"
        >
          {t("reservationDetailsRemoveDigitalReservationText")}
        </button>
        <Link
          id="test-ereolen-button"
          // todo get from config
          href={new URL(ereolenMyPageUrl)}
          className="btn-primary btn-filled btn-small arrow__hover--right-small"
        >
          {t("reservationDetailsDigitalReservationGoToEreolenText")}
          <img src={ExternalLinkIcon} className="btn-icon invert" alt="" />
        </Link>
      </div>
      <DeleteReservationModal
        deleteReservation={deleteReservation}
        id={modalId}
      />
    </>
  );
};

export default ReservationDetailsRedirect;
