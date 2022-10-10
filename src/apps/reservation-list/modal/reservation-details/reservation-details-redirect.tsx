import React, { FC, useCallback } from "react";
import ExternalLinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg";
import { Link } from "../../../../components/atoms/link";
import { useText } from "../../../../core/utils/text";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";
import { useDeleteV1UserReservationsIdentifier } from "../../../../core/publizon/publizon";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import DeleteReservationModal from "../delete-reservation/delete-reservation-modal";
import { getModalIds } from "../../../../core/utils/helpers/general";

export interface ReservationDetailsRedirectProps {
  reservationId: string;
}

const ReservationDetailsRedirect: FC<
  ReservationDetailsRedirectProps & MaterialProps
> = ({ reservationId }) => {
  const t = useText();
  const modalIds = getModalIds();
  const modalId = `${modalIds.deleteReservation}${reservationId}`;
  const { mutate } = useDeleteV1UserReservationsIdentifier();
  const { open, close } = useModalButtonHandler();

  const deleteReservation = useCallback(() => {
    mutate(
      {
        identifier: reservationId
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSuccess: (result) => {
          // todo
          close(modalId);
        },
        // todo error handling, missing in figma
        onError: () => {
          close(modalId);
        }
      }
    );
  }, [close, modalId, mutate, reservationId]);

  return (
    <>
      <div className="modal-details__buttons">
        <button
          type="button"
          onClick={() => open(modalId)}
          className="link-tag mx-16"
        >
          {t("reservationDetailsRemoveReservationText")}
        </button>
        <Link
          id="test-ereolen-button"
          href={new URL("https://ereolen.dk/user/me/")}
          className="btn-primary btn-filled btn-small arrow__hover--right-small"
        >
          {t("reservationDetailsGoToEreolenText")}
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
