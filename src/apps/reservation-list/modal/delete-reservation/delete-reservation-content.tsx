import React, { FC, useCallback } from "react";
import { useText } from "../../../../core/utils/text";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";

export interface DeleteReservationContentProps {
  deleteReservation: () => void;
}

const DeleteReservationContent: FC<
  DeleteReservationContentProps & MaterialProps
> = ({ deleteReservation }) => {
  const t = useText();

  const deleteReservationCallback = useCallback(() => {
    deleteReservation();
  }, [deleteReservation]);

  return (
    <>
      <h1 className="text-header-h3">
        {t("deleteReservationModalHeaderText")}
      </h1>
      <div className="mt-48 color-secondary-gray">
        <p className="text-body-medium-regular">
          {t("deleteReservationModalDeleteQuestionText")}
        </p>
        <p className="text-body-medium-regular">
          {t("deleteReservationModalNotRegrettableText")}
        </p>
      </div>

      <div className="modal-pause__button mt-48">
        <button
          type="button"
          id="test-delete-reservation-button"
          onClick={deleteReservationCallback}
          className="btn-primary btn-filled btn-large arrow__hover--right-small"
        >
          {t("deleteReservationModalDeleteButtonText")}
        </button>
      </div>
    </>
  );
};

export default DeleteReservationContent;
