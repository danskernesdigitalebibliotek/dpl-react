import React, { FC, useEffect, useState } from "react";
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
import { useConfig } from "../../../../core/utils/config";
import MaterialButtonLoading from "../../../../components/material/material-buttons/generic/MaterialButtonLoading";
import { useComplexSearchWithPaginationWorkAccessQuery } from "../../../../core/dbc-gateway/generated/graphql";
import {
  findAccessManifestationByIdentifier,
  findEreolAccessLinkFromManifestations
} from "./helper";
import { useUrls } from "../../../../core/utils/url";

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
  const [externalUrl, setExternalUrl] = useState<URL | null>(null);
  const { state, identifier, numberInQueue } = reservation;
  const { authors, pid, year, title, description, materialType } =
    material || {};
  const { allowRemoveReadyReservations } = config<{
    allowRemoveReadyReservations: boolean;
  }>("reservationDetailsConfig", {
    transformer: "jsonParse"
  });
  const isDigital = !!reservation.identifier;
  const readyForPickupState = "readyForPickup";
  const allowUserRemoveReadyReservations =
    (state === readyForPickupState && allowRemoveReadyReservations) ||
    state !== readyForPickupState;

  const { data: complexSearchData, isLoading: isLoadingComplexSearch } =
    useComplexSearchWithPaginationWorkAccessQuery(
      { cql: `term.isbn=${identifier}`, offset: 0, limit: 100, filters: {} },
      { enabled: !!identifier }
    );
  const { ereolenHomepageUrl } = useUrls();

  useEffect(() => {
    if (!complexSearchData || complexSearchData.complexSearch.hitcount === 0) {
      return;
    }
    const matchingManifestations = findAccessManifestationByIdentifier(
      complexSearchData.complexSearch.works[0].manifestations.all,
      identifier || ""
    );
    setExternalUrl(
      new URL(
        findEreolAccessLinkFromManifestations(matchingManifestations) ||
          ereolenHomepageUrl
      )
    );
  }, [complexSearchData, identifier, ereolenHomepageUrl]);

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
          {isDigital && reservation.identifier && isLoadingComplexSearch && (
            <div className="modal-details__buttons modal-details__buttons--hide-on-mobile">
              <MaterialButtonLoading classNames="modal-details__buttons--hide-on-mobile" />
            </div>
          )}
          {isDigital &&
            reservation.identifier &&
            !isLoadingComplexSearch &&
            externalUrl && (
              <div className="modal-details__buttons modal-details__buttons--hide-on-mobile">
                <ReservationDetailsRedirect
                  openReservationDeleteModal={openReservationDeleteModal}
                  reservation={reservation}
                  reservationId={reservation.identifier}
                  className="modal-details__buttons--hide-on-mobile"
                  linkClassNames="mx-16"
                  externalLink={externalUrl}
                />
              </div>
            )}
          <div className="modal-details__list">
            {isDigital && <DigitalListDetails reservation={reservation} />}
            {!isDigital && <PhysicalListDetails reservation={reservation} />}
          </div>
          {reservation.reservationId && allowUserRemoveReadyReservations && (
            <ReservationDetailsButton
              buttonClassNames="modal-details__buttons__full-width"
              openReservationDeleteModal={openReservationDeleteModal}
              numberInQueue={numberInQueue}
              reservation={reservation}
            />
          )}
          {isDigital &&
            reservation.identifier &&
            !isLoadingComplexSearch &&
            externalUrl && (
              <ReservationDetailsRedirect
                openReservationDeleteModal={openReservationDeleteModal}
                reservationId={reservation.identifier}
                linkClassNames="my-16"
                reservation={reservation}
                externalLink={externalUrl}
              />
            )}
        </>
      )}
    </div>
  );
};

export default fetchDigitalMaterial(fetchMaterial(ReservationDetails));
