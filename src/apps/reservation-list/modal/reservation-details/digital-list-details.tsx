import React, { FC } from "react";
import ReservationsIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reservations.svg";
import LoansIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Loans.svg";
import { useText } from "../../../../core/utils/text";
import { ReservationType } from "../../../../core/utils/types/reservation-type";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";
import ListDetails from "../../../../components/list-details/list-details";
import { formatDateTime } from "../../../../core/utils/helpers/date";

export interface DigitalListDetailsProps {
  reservation: ReservationType;
}

const DigitalListDetails: FC<DigitalListDetailsProps & MaterialProps> = ({
  reservation
}) => {
  const t = useText();

  const { expiryDate, dateOfReservation, pickupDeadline, state } = reservation;

  return (
    <>
      {expiryDate && state === "readyForPickup" && (
        <ListDetails
          icon={ReservationsIcon}
          title={t("reservationDetailsStatusTitleText")}
          labels={t("reservationDetailsExpiresText", {
            placeholders: { "@date": formatDateTime(expiryDate) }
          })}
        />
      )}
      {pickupDeadline && state === "reserved" && (
        <ListDetails
          icon={ReservationsIcon}
          title={t("reservationDetailsStatusTitleText")}
          labels={t("reservationDetailsBorrowBeforeText", {
            placeholders: { "@date": formatDateTime(pickupDeadline) }
          })}
        />
      )}
      {dateOfReservation && (
        <ListDetails
          icon={LoansIcon}
          labels={formatDateTime(dateOfReservation)}
          title={t("reservationDetailsDateOfReservationTitleText")}
        />
      )}
    </>
  );
};

export default DigitalListDetails;
