import React, {
  FC,
  useEffect,
  useState,
  useCallback,
  ChangeEvent
} from "react";
import dayjs from "dayjs";
import EbookIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Ebook.svg";
import LocationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import LoanHistoryIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/LoanHistory.svg";
import ReservationsIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reservations.svg";
import LoansIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Loans.svg";
import { useText } from "../../../core/utils/text";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import { MaterialProps } from "../../loan-list/materials/utils/material-fetch-hoc";
import { useGetBranches, useUpdateReservations } from "../../../core/fbs/fbs";
import {
  getPreferredBranch,
  hardcodedInterestPeriods
} from "../../../components/reservation/helper";
import { AgencyBranch } from "../../../core/fbs/model";
import { formatDate } from "../../loan-list/utils/helpers";
import ListDetails from "../../../components/list-details/list-details";
import { Button } from "../../../components/Buttons/Button";
import ListDetailsDropdown, {
  OptionsProps
} from "../../../components/list-details-dropdown/list-details-dropdown";

interface PhysicalListDetailsProps {
  reservation: ReservationType;
}

const PhysicalListDetails: FC<PhysicalListDetailsProps & MaterialProps> = ({
  reservation
}) => {
  const t = useText();
  const { mutate } = useUpdateReservations();
  const branchResponse = useGetBranches();
  const [pickupBranchFetched, setPickupBranchFetched] = useState<string>("");
  const [showBranchesSelect, setShowBranchesSelect] = useState<boolean>(false);
  const [showExpirySelect, setShowExpirySelect] = useState<boolean>(false);
  const [branches, setBranches] = useState<OptionsProps[] | null>(null);
  const [newBranch, setNewBranch] = useState<OptionsProps | null>(null);
  const [newExpiryDate, setNewExpiryDate] = useState<OptionsProps | null>(null);
  const formatInterestPeriods = Object.entries(hardcodedInterestPeriods(t)).map(
    ([key, value]) => ({
      value: key,
      label: value
    })
  );

  const {
    numberInQueue,
    pickupBranch,
    expiryDate,
    pickupDeadline,
    dateOfReservation,
    pickupNumber,
    reservationId
  } = reservation;

  useEffect(() => {
    if (branchResponse.data && pickupBranch) {
      // Map branches to match select options
      const mappedBranches = branchResponse.data.map(({ title, branchId }) => {
        return { label: title, value: branchId };
      });
      setBranches(mappedBranches);
      setPickupBranchFetched(
        getPreferredBranch(pickupBranch, branchResponse.data as AgencyBranch[])
      );

      // selected branch
      const selected = mappedBranches.filter(
        ({ value }) => value === pickupBranch
      );
      if (selected.length > 0) {
        setNewBranch(selected[0]);
      }
    }
  }, [branchResponse.data, pickupBranch]);

  const changeExpiryDate = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newEpiryDate = formatInterestPeriods.filter(
        ({ value }) => value === e.target.value
      );

      if (newEpiryDate.length > 0) {
        setNewExpiryDate(newEpiryDate[0]);
      }
    },
    [formatInterestPeriods, setNewExpiryDate]
  );

  const changeNewBranch = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (branches) {
        const selectedBranch = branches.filter(
          ({ value }) => value === e.target.value
        );
        if (selectedBranch.length > 0) {
          setNewBranch(selectedBranch[0]);
        }
      }
    },
    [branches]
  );

  const save = useCallback(() => {
    if (reservationId) {
      let selectedExpiryDate = expiryDate || "";
      if (newExpiryDate) {
        selectedExpiryDate = dayjs(expiryDate)
          .add(parseInt(newExpiryDate.value, 10), "days")
          .format("YYYY-MM-DD");
      }
      mutate(
        {
          data: {
            reservations: [
              {
                expiryDate: selectedExpiryDate,
                pickupBranch: newBranch?.value,
                reservationId
              }
            ]
          }
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onSuccess: (result) => {
            // todo
            setShowBranchesSelect(false);
            setShowExpirySelect(false);
          },
          // todo error handling, missing in figma
          onError: () => {}
        }
      );
    }
  }, [expiryDate, mutate, reservationId, newBranch?.value, newExpiryDate]);

  const cancel = useCallback(() => {
    // Reset branch to original branch
    if (branches) {
      let originalBranch: OptionsProps[] = [];
      originalBranch = branches.filter(({ value }) => value === pickupBranch);
      if (originalBranch.length > 0) {
        setNewBranch(originalBranch[0]);
      }
    }
    // Reset expiry date to original expiryDate
    setNewExpiryDate(null);

    // reset to "change" links
    setShowBranchesSelect(false);
    setShowExpirySelect(false);
  }, [branches, pickupBranch]);

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
          {branches && (
            <ListDetailsDropdown
              showSelect={showBranchesSelect}
              setShowSelect={setShowBranchesSelect}
              onDropdownChange={changeNewBranch}
              options={branches}
              selected={newBranch}
            />
          )}
        </ListDetails>
      )}
      {expiryDate && (
        <ListDetails
          icon={LoanHistoryIcon}
          title={t("reservationDetailsNoInterestAfterTitelText")}
          labels={[formatDate(expiryDate)]}
        >
          <ListDetailsDropdown
            showSelect={showExpirySelect}
            setShowSelect={setShowExpirySelect}
            onDropdownChange={changeExpiryDate}
            options={formatInterestPeriods}
            selected={newExpiryDate}
          />
        </ListDetails>
      )}
      {pickupDeadline && (
        <ListDetails
          icon={ReservationsIcon}
          title={t("reservationDetailsPickupDeadlineTitleText")}
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
