import React, { FC, useEffect, useState } from "react";
import EbookIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Ebook.svg";
import ExpandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import LocationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import LoanHistoryIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/LoanHistory.svg";
import ReservationsIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reservations.svg";
import LoansIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Loans.svg";
import { useText } from "../../../core/utils/text";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import ModalDetailsHeader from "../../../components/modal-details-header/modal-details-header";
import { useGetBranches } from "../../../core/fbs/fbs";
import { getPreferredBranch } from "../../../components/reservation/helper";
import { AgencyBranch } from "../../../core/fbs/model";
import { formatDate } from "../../loan-list/utils/helpers";
import ListDetails from "../../../components/list-details/list-details";
import fetchDigitalMaterial from "../../loan-list/materials/utils/digital-material-fetch-hoc";
import ReservationDetailsButton from "./reservation-details-buttons";
import ReservationDetailsRedirect from "./reservation-details-redirect";

export interface ReservationDetailsProps {
  reservation: ReservationType;
}

const ReservationDetails: FC<ReservationDetailsProps & MaterialProps> = ({
  reservation,
  material
}) => {
  const t = useText();
  const branchResponse = useGetBranches();
  const [pickupBranchFetched, setPickupBranchFetched] = useState<string>("");
  const [branches, setBranches] = useState<AgencyBranch[]>([]);

  const {
    numberInQueue,
    pickupBranch,
    expiryDate,
    pickupDeadline,
    dateOfReservation,
    pickupNumber,
    state,
    identifier
  } = reservation;

  const { authors, pid, year, title, description, materialType } =
    material || {};

  useEffect(() => {
    if (branchResponse.data && pickupBranch) {
      setBranches(branchResponse.data);
      setPickupBranchFetched(
        getPreferredBranch(pickupBranch, branchResponse.data as AgencyBranch[])
      );
    }
  }, [branchResponse.data, pickupBranch]);

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
            />
          )}
          {reservation.identifier && (
            <ReservationDetailsRedirect
              reservationId={reservation.identifier}
            />
          )}
          <div className="modal-details__list">
            {/* todo when does the value change */}
            {numberInQueue && (
              <ListDetails
                icon={EbookIcon}
                title={t("reservationDetailsNumberInQueueTitelText")}
                labels={[
                  `${t(
                    "reservationDetailsNumberInQueueLabelText"
                  )} ${numberInQueue}`
                ]}
              />
            )}
            {pickupBranchFetched && (
              <ListDetails
                icon={LocationIcon}
                title={t("reservationDetailsPickUpAtTitelText")}
                labels={[pickupBranchFetched, pickupNumber || ""]}
              >
                <div className="dropdown">
                  <select className="dropdown__select">
                    {/* todo when does the value change */}
                    {branches.map(({ title: branchTitle, branchId }) => (
                      <option
                        key={branchId}
                        selected={branchId === pickupBranch}
                        className="dropdown__option"
                        value={branchTitle}
                      >
                        {branchTitle}
                      </option>
                    ))}
                  </select>
                  <div className="dropdown__arrows">
                    <img className="dropdown__arrow" src={ExpandIcon} alt="" />
                  </div>
                </div>
              </ListDetails>
            )}
            {expiryDate && (
              <ListDetails
                icon={LoanHistoryIcon}
                title={
                  reservation.identifier
                    ? "Sdfsdfsdfsdf"
                    : t("reservationDetailsNoInterestAfterTitelText")
                }
                labels={[formatDate(expiryDate)]}
              >
                <div className="dropdown">
                  <input
                    className="dropdown__select"
                    value={expiryDate}
                    type="date"
                  />
                </div>
              </ListDetails>
            )}
            {pickupDeadline && (
              <ListDetails
                icon={ReservationsIcon}
                title={t("reservationDetailsPickupDeadlineTitelText")}
                labels={[formatDate(pickupDeadline)]}
              />
            )}
            {dateOfReservation && (
              <ListDetails
                icon={LoansIcon}
                title={t("reservationDetailsDateOfReservationTitelText")}
                labels={[formatDate(dateOfReservation)]}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default fetchDigitalMaterial(fetchMaterial(ReservationDetails));
