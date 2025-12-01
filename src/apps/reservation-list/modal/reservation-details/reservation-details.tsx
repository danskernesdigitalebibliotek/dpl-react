import React, { FC, useMemo } from "react";
import {
  isDigitalReservation,
  isPhysicalReservation,
  ReservationType
} from "../../../../core/utils/types/reservation-type";
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
import { useConfig } from "../../../../core/utils/config";
import MaterialButtonLoading from "../../../../components/material/material-buttons/generic/MaterialButtonLoading";
import useGetWorkUrlFromPublizonIdentifier from "../../../../core/utils/useGetWorkUrlFromPublizonIdentifier";
import { WorkId } from "../../../../core/utils/types/ids";
import { useUrls } from "../../../../core/utils/url";
import { constructMaterialUrl } from "../../../../core/utils/helpers/url";

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
  const u = useUrls();
  const materialUrl = u("materialUrl");
  const isDigital = isDigitalReservation(reservation);
  const isPhysical = isPhysicalReservation(reservation);
  const { state, identifier } = reservation;
  const { authors, pid, year, title, description, materialType } =
    material || {};
  const { allowRemoveReadyReservations } = config<{
    allowRemoveReadyReservations: boolean;
  }>("reservationDetailsConfig", {
    transformer: "jsonParse"
  });
  const readyForPickupState = "readyForPickup";
  const allowUserRemoveReadyReservations =
    (state === readyForPickupState && allowRemoveReadyReservations) ||
    state !== readyForPickupState;

  // For digital reservations, get work URL from ISBN identifier
  const { workUrl: digitalWorkUrl, isLoading: isLoadingDigitalWorkUrl } =
    useGetWorkUrlFromPublizonIdentifier(isDigital ? identifier : null);

  // For physical reservations, construct work URL from PID
  const physicalWorkUrl = useMemo(() => {
    if (isPhysical && pid) {
      const workId = `work-of:${pid}` as WorkId;
      return constructMaterialUrl(
        materialUrl,
        workId,
        materialType || undefined
      );
    }
    return null;
  }, [isPhysical, pid, materialUrl, materialType]);

  // Use the appropriate work URL based on reservation type
  const workUrl = isDigital ? digitalWorkUrl : physicalWorkUrl;
  const isLoading = isDigital ? isLoadingDigitalWorkUrl : false;

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
            workUrl={workUrl}
          >
            {state === readyForPickupState && (
              <div className="status-label status-label--info">
                {t("reservationDetailsReadyForLoanText")}
              </div>
            )}
          </ModalDetailsHeader>
          {isPhysicalReservation(reservation) &&
            allowUserRemoveReadyReservations && (
              <ReservationDetailsButton
                classNames="modal-details__buttons--hide-on-mobile"
                openReservationDeleteModal={openReservationDeleteModal}
                reservation={reservation}
              />
            )}
          {isDigitalReservation(reservation) && isLoading && (
            <div className="modal-details__buttons modal-details__buttons--hide-on-mobile">
              <MaterialButtonLoading classNames="modal-details__buttons--hide-on-mobile" />
            </div>
          )}
          {isDigitalReservation(reservation) && !isLoading && workUrl && (
            <ReservationDetailsRedirect
              openReservationDeleteModal={openReservationDeleteModal}
              reservation={reservation}
              className="modal-details__buttons--hide-on-mobile"
              linkClassNames="mx-16"
              workUrl={workUrl}
            />
          )}
          <div className="modal-details__list">
            {isDigitalReservation(reservation) && (
              <DigitalListDetails reservation={reservation} />
            )}
            {isPhysicalReservation(reservation) && (
              <PhysicalListDetails reservation={reservation} />
            )}
          </div>
          {isPhysicalReservation(reservation) &&
            allowUserRemoveReadyReservations && (
              <ReservationDetailsButton
                buttonClassNames="modal-details__buttons__full-width"
                openReservationDeleteModal={openReservationDeleteModal}
                reservation={reservation}
              />
            )}
          {isDigitalReservation(reservation) && !isLoading && workUrl && (
            <ReservationDetailsRedirect
              openReservationDeleteModal={openReservationDeleteModal}
              linkClassNames="my-16"
              reservation={reservation}
              workUrl={workUrl}
            />
          )}
        </>
      )}
    </div>
  );
};

export default fetchDigitalMaterial(fetchMaterial(ReservationDetails));
