import React, { FC } from "react";
import { ReservationType } from "../../../../core/utils/types/reservation-type";
import fetchMaterial, {
  MaterialProps
} from "../../../loan-list/materials/utils/material-fetch-hoc";
import ModalDetailsHeader from "../../../../components/modal-details-header/modal-details-header";
import DigitalListDetails from "./digital-list-details";
import ReservationDetailsButton from "./reservation-details-buttons";
import ReservationDetailsRedirect from "./reservation-details-redirect";
import { useText } from "../../../../core/utils/text";
import fetchDigitalMaterial from "../../../loan-list/materials/utils/digital-material-fetch-hoc";
import PhysicalListDetails from "./physical-list-details";
import { useGetBranches } from "../../../../core/utils/branches";

export interface ReservationDetailsProps {
  reservation: ReservationType;
  openReservationDeleteModal: (deleteId: string) => void;
}

const ReservationDetails: FC<ReservationDetailsProps & MaterialProps> = ({
  reservation,
  material,
  openReservationDeleteModal
}) => {
  const t = useText();
  const { state, identifier, numberInQueue } = reservation;
  const { authors, pid, year, title, description, materialType } =
    material || {};
  const branches = useGetBranches();
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
            materialType={materialType}
            series={material.series}
          >
            {state === "readyForPickup" && (
              <div className="status-label status-label--info">
                {t("reservationDetailsReadyForLoanText")}
              </div>
            )}
          </ModalDetailsHeader>
          {reservation.reservationId && (
            <ReservationDetailsButton
              openReservationDeleteModal={openReservationDeleteModal}
              reservationId={reservation.reservationId}
              numberInQueue={numberInQueue}
            />
          )}
          {isDigital && reservation.identifier && (
            <ReservationDetailsRedirect
              openReservationDeleteModal={openReservationDeleteModal}
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
