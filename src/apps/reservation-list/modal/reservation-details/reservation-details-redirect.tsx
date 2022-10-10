import React, { FC, useCallback } from "react";
import ExternalLinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg";
import { Link } from "../../../components/atoms/link";
import { useText } from "../../../core/utils/text";
import { MaterialProps } from "../../loan-list/materials/utils/material-fetch-hoc";
import { useDeleteV1UserReservationsIdentifier } from "../../../core/publizon/publizon";

export interface ReservationDetailsRedirectProps {
  reservationId: string;
}

const ReservationDetailsRedirect: FC<
  ReservationDetailsRedirectProps & MaterialProps
> = ({ reservationId }) => {
  const t = useText();
  const { mutate } = useDeleteV1UserReservationsIdentifier();

  const deleteReservation = useCallback(() => {
    if (reservationId) {
      mutate(
        {
          identifier: reservationId
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onSuccess: (result) => {
            // todo
          },
          // todo error handling, missing in figma
          onError: () => {}
        }
      );
    }
  }, [mutate, reservationId]);

  return (
    <div className="modal-details__buttons">
      <button
        type="button"
        onClick={deleteReservation}
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
  );
};

export default ReservationDetailsRedirect;
