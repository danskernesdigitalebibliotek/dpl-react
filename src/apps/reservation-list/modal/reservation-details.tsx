import React, { FC } from "react";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import ModalDetailsHeader from "../../../components/modal-details-header/modal-details-header";
import fetchDigitalMaterial from "../../loan-list/materials/utils/digital-material-fetch-hoc";
import ReservationDetailsButton from "./reservation-details-buttons";
import ReservationDetailsRedirect from "./reservation-details-redirect";
import DigitalListDetails from "./digital-list-details";
import PhysicalListDetails from "./physical-list-details";
import { AgencyBranch } from "../../../core/fbs/model";

export interface ReservationDetailsProps {
  reservation: ReservationType;
  branches: AgencyBranch[];
}

const ReservationDetails: FC<ReservationDetailsProps & MaterialProps> = ({
  reservation,
  material,
  branches
}) => {
  const { state, identifier, numberInQueue } = reservation;

  const { authors, pid, year, title, description, materialType } =
    material || {};

  const isDigital = !!reservation.identifier;

  return (
    <div className="modal-details__container">
      {material && (
        <>
          <ModalDetailsHeader
            isbnForCover={identifier || ""}
            authors={authors}
            year={year}
            title={title}
            pid={pid}
            description={description}
            readyForPickup={state === "readyForPickup"}
            materialType={materialType}
          />
          {reservation.reservationId && (
            <ReservationDetailsButton
              reservationId={reservation.reservationId}
              numberInQueue={numberInQueue}
            />
          )}
          {isDigital && reservation.identifier && (
            <ReservationDetailsRedirect
              reservationId={reservation.identifier}
            />
          )}
          <div className="modal-details__list">
            {isDigital && <DigitalListDetails reservation={reservation} />}
            {!isDigital && (
              <PhysicalListDetails
                branches={branches}
                reservation={reservation}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default fetchDigitalMaterial(fetchMaterial(ReservationDetails));
