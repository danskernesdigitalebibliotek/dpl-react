import React, { FC, useCallback } from "react";
import { useText } from "../../../../core/utils/text";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";

export interface DeleteReservationContentProps {
  deleteReservation: () => void;
  reservationsCount: number;
}

const DeleteReservationContent: FC<
  DeleteReservationContentProps & MaterialProps
> = ({ deleteReservation, reservationsCount }) => {
  const t = useText();

  const deleteReservationCallback = useCallback(() => {
    deleteReservation();
  }, [deleteReservation]);

  return (
    <>
      <h2 className="text-header-h3">
        {t("deleteReservationModalHeaderText", {
          count: reservationsCount
        })}
      </h2>
      <div className="mt-48 color-secondary-gray">
        <p className="text-body-medium-regular">
          {t("deleteReservationModalDeleteQuestionText", {
            count: reservationsCount
          })}
        </p>
        <p className="text-body-medium-regular">
          {t("deleteReservationModalNotRegrettableText")}
        </p>
      </div>
      <div className="modal-pause__button mt-48">
        <button
          type="button"
          data-cy="delete-reservation-button"
          onClick={deleteReservationCallback}
          className="btn-primary btn-filled btn-large arrow__hover--right-small"
        >
          {t("deleteReservationModalDeleteButtonText", {
            count: reservationsCount
          })}
        </button>
      </div>
    </>
  );
};

export default DeleteReservationContent;
