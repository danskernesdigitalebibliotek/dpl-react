import React, { FC, useCallback } from "react";
import { useText } from "../../../../core/utils/text";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";
import { RequestStatus } from "../../../../core/utils/types/request";
import { getDeleteButtonLabel } from "./helper";
import { Button } from "../../../../components/Buttons/Button";

export interface DeleteReservationContentProps {
  deleteReservation: () => void;
  reservationsCount: number;
  deletionStatus: RequestStatus;
}

const DeleteReservationContent: FC<
  DeleteReservationContentProps & MaterialProps
> = ({ deleteReservation, reservationsCount, deletionStatus }) => {
  const t = useText();

  const deleteReservationCallback = useCallback(() => {
    deleteReservation();
  }, [deleteReservation]);

  const buttonLabel = getDeleteButtonLabel({
    t,
    reservationsCount,
    deletionStatus
  });

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
        <Button
          data-cy="delete-reservation-button"
          label={buttonLabel}
          buttonType="none"
          variant="filled"
          disabled={deletionStatus === "pending"}
          collapsible={false}
          onClick={deleteReservationCallback}
          size="small"
        />
      </div>
    </>
  );
};

export default DeleteReservationContent;
