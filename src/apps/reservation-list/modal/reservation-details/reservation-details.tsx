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
import { useConfig } from "../../../../core/utils/config";
import { isConfigValueOne } from "../../../../components/reservation/helper";

export interface ReservationDetailsProps {
  reservation: ReservationType;
  openReservationDeleteModal: (deleteReservation: ReservationType) => void;
}

const ReservationDetails: FC<ReservationDetailsProps & MaterialProps> = ({
  reservation,
  material,
  openReservationDeleteModal
}) => {
  const t = useText();
  const config = useConfig();
  const { state, identifier, numberInQueue } = reservation;
  const { authors, pid, year, title, description, materialType } =
    material || {};
  const branches = useGetBranches("blacklistedPickupBranchesConfig");
  const allowRemoveReadyReservation = config(
    "reservationDetailAllowRemoveReadyReservationsConfig"
  );
  const isDigital = !!reservation.identifier;
  const readyForPickupState = "readyForPickup";
  const allowUserRemoveReadyReservations =
    (state === readyForPickupState &&
      isConfigValueOne(allowRemoveReadyReservation)) ||
    state !== readyForPickupState;

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
            {state === readyForPickupState && (
              <div className="status-label status-label--info">
                {t("reservationDetailsReadyForLoanText")}
              </div>
            )}
          </ModalDetailsHeader>
          {reservation.reservationId && allowUserRemoveReadyReservations && (
            <ReservationDetailsButton
              classNames="modal-details__buttons--hide-on-mobile"
              openReservationDeleteModal={openReservationDeleteModal}
              reservation={reservation}
              numberInQueue={numberInQueue}
            />
          )}
          {isDigital && reservation.identifier && (
            <ReservationDetailsRedirect
              openReservationDeleteModal={openReservationDeleteModal}
              reservation={reservation}
              reservationId={reservation.identifier}
              className="modal-details__buttons--hide-on-mobile"
              linkClassNames="mx-16"
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
          {reservation.reservationId && allowUserRemoveReadyReservations && (
            <ReservationDetailsButton
              buttonClassNames="modal-details__buttons__full-width"
              openReservationDeleteModal={openReservationDeleteModal}
              numberInQueue={numberInQueue}
              reservation={reservation}
            />
          )}
          {isDigital && reservation.identifier && (
            <ReservationDetailsRedirect
              openReservationDeleteModal={openReservationDeleteModal}
              reservationId={reservation.identifier}
              linkClassNames="my-16"
              reservation={reservation}
            />
          )}
        </>
      )}
    </div>
  );
};

export default fetchDigitalMaterial(fetchMaterial(ReservationDetails));
