import React, {
  FC,
  useEffect,
  useState,
  useCallback,
  ChangeEvent
} from "react";
import EbookIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Ebook.svg";
import ExpandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import LocationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import LoanHistoryIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/LoanHistory.svg";
import ReservationsIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reservations.svg";
import LoansIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Loans.svg";
import { useText } from "../../../core/utils/text";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import { MaterialProps } from "../../loan-list/materials/utils/material-fetch-hoc";
import { useGetBranches, useUpdateReservations } from "../../../core/fbs/fbs";
import { getPreferredBranch } from "../../../components/reservation/helper";
import { AgencyBranch } from "../../../core/fbs/model";
import { formatDate } from "../../loan-list/utils/helpers";
import ListDetails from "../../../components/list-details/list-details";
import { Button } from "../../../components/Buttons/Button";

export interface PhysicalListDetailsProps {
  reservation: ReservationType;
}

const PhysicalListDetails: FC<PhysicalListDetailsProps & MaterialProps> = ({
  reservation
}) => {
  const t = useText();
  const branchResponse = useGetBranches();
  const [pickupBranchFetched, setPickupBranchFetched] = useState<string>("");
  const [branches, setBranches] = useState<AgencyBranch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<AgencyBranch>();
  const { mutate } = useUpdateReservations();

  const {
    numberInQueue,
    pickupBranch,
    expiryDate,
    pickupDeadline,
    dateOfReservation,
    pickupNumber,
    reservationId
  } = reservation;
  const [selectedExpiryDate, setSelectedExpiryDate] = useState<string>(
    expiryDate || ""
  );

  useEffect(() => {
    if (branchResponse.data && pickupBranch) {
      setBranches(branchResponse.data);
      setPickupBranchFetched(
        getPreferredBranch(pickupBranch, branchResponse.data as AgencyBranch[])
      );
      // selected branch
      const selected: AgencyBranch[] = branchResponse.data.filter(
        ({ branchId }) => branchId === pickupBranch
      );
      if (selected.length > 0) {
        setSelectedBranch(selected[0]);
      }
    }
  }, [branchResponse.data, pickupBranch]);

  const changeSelectedBranch = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newBranch = branches.filter(
        ({ branchId }) => branchId === e.target.value
      );
      if (newBranch.length > 0) {
        setSelectedBranch(newBranch[0]);
      }
    },
    [branches]
  );

  const save = useCallback(() => {
    if (reservationId) {
      mutate(
        {
          data: {
            reservations: [
              {
                expiryDate: selectedExpiryDate,
                pickupBranch: selectedBranch?.branchId,
                reservationId
              }
            ]
          }
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onSuccess: (result) => {
            // todo
          },
          // todo error handling, missing in figma
          onError: () => {}
        }
      );
    }
  }, [mutate, reservationId, selectedBranch, selectedExpiryDate]);

  const cancel = useCallback(() => {
    // Reset branch to original branch
    const originalBranch = branches.filter(
      ({ branchId }) => branchId === pickupBranch
    );
    if (originalBranch.length > 0) {
      setSelectedBranch(originalBranch[0]);
    }
    // Reset expiry date to original expiryDate
    setSelectedExpiryDate(expiryDate || "");
  }, [branches, expiryDate, pickupBranch]);

  return (
    <>
      {/* todo when does the value change */}
      {numberInQueue && (
        <ListDetails
          icon={EbookIcon}
          title={t("reservationDetailsNumberInQueueTitelText")}
          labels={[
            `${t("reservationDetailsNumberInQueueLabelText")} ${numberInQueue}`
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
            <select
              className="dropdown__select"
              onChange={(e) => changeSelectedBranch(e)}
            >
              {/* todo when does the value change */}
              {branches.map(({ title: branchTitle, branchId }) => (
                <option
                  key={branchId}
                  selected={selectedBranch?.branchId === branchId}
                  className="dropdown__option"
                  value={branchId}
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
          title={t("reservationDetailsNoInterestAfterTitelText")}
          labels={[formatDate(expiryDate)]}
        >
          <div className="dropdown">
            <input
              className="dropdown__select"
              value={selectedExpiryDate}
              onChange={(e) => setSelectedExpiryDate(e.target.value)}
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
      <div className="modal-details__buttons">
        <button type="button" className="link-tag mx-16" onClick={cancel}>
          {t("reservationDetailsCancelText")}
        </button>
        <Button
          label={t("reservationDetailsSaveText")}
          buttonType="none"
          variant="filled"
          disabled={false}
          onClick={save}
          collapsible={false}
          size="small"
        />
      </div>
    </>
  );
};

export default PhysicalListDetails;
