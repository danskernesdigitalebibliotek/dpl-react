import React, { FC } from "react";
import ReservationsIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reservations.svg";
import LoansIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Loans.svg";
import { useText } from "../../../../core/utils/text";
import { ReservationType } from "../../../../core/utils/types/reservation-type";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";
import { formatDate } from "../../../loan-list/utils/helpers";
import ListDetails from "../../../../components/list-details/list-details";

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
          title={t("reservationDetailsExpiresTitelText")}
          // todo string interpolation
          labels={`${t("reservationDetailsExpiresLabelText")} ${formatDate(
            expiryDate
          )}`}
        />
      )}
      {pickupDeadline && state === "reserved" && (
        <ListDetails
          icon={ReservationsIcon}
          title={t("reservationDetailsExpiresTitelText")}
          // todo string interpolation
          labels={`${t("reservationDetailsLoanBeforeText")} ${formatDate(
            pickupDeadline
          )}`}
        />
      )}
      {dateOfReservation && (
        <ListDetails
          icon={LoansIcon}
          title={t("reservationDetailsDateOfReservationTitelText")}
          labels={[formatDate(dateOfReservation)]}
        />
      )}
    </>
  );
};

export default DigitalListDetails;
