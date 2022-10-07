import React, { FC, useCallback } from "react";
import { useText } from "../../../core/utils/text";
import { MaterialProps } from "../../loan-list/materials/utils/material-fetch-hoc";
import MaterialButtonOnlineExternal from "../../../components/material/material-buttons/online/MaterialButtonOnlineExternal";
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
      <MaterialButtonOnlineExternal
        origin="ereolen"
        size="small"
        externalUrl="https://ereolen.dk/user/me/"
      />
    </div>
  );
};

export default ReservationDetailsRedirect;
