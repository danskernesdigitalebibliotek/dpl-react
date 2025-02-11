import React, { FC, useState } from "react";
import EbookIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Ebook.svg";
import LocationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import LoanHistoryIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/LoanHistory.svg";
import ReservationsIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reservations.svg";
import LoansIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Loans.svg";
import { useQueryClient } from "react-query";
import { useText } from "../../../../core/utils/text";
import { ReservationType } from "../../../../core/utils/types/reservation-type";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";
import {
  useUpdateReservations,
  getGetReservationsV2QueryKey
} from "../../../../core/fbs/fbs";
import { getPreferredBranch } from "../../../../components/reservation/helper";
import { AgencyBranch } from "../../../../core/fbs/model";
import ListDetails from "../../../../components/list-details/list-details";
import { useConfig } from "../../../../core/utils/config";
import PickupModal from "../../../../components/reservation/forms/PickupModal";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import {
  ModalReservationFormTextType,
  modalReservationFormId
} from "../../../../components/reservation/forms/helper";
import { excludeBlacklistedBranches } from "../../../../core/utils/branches";
import ReservationFormListItem from "../../../../components/reservation/ReservationFormListItem";
import NoInterestAfterModal from "../../../../components/reservation/forms/NoInterestAfterModal";
import { RequestStatus } from "../../../../core/utils/types/request";
import {
  formatDate,
  getFutureDateString
} from "../../../../core/utils/helpers/date";
import { getReadyForPickup } from "../../utils/helpers";
import { Periods } from "../../../../components/reservation/types";
import { FormSelectValue } from "../../../../components/reservation/forms/types";
import { getReservationsForSaving } from "./helper";

interface PhysicalListDetailsProps {
  reservation: ReservationType;
}

const PhysicalListDetails: FC<PhysicalListDetailsProps & MaterialProps> = ({
  reservation,
  reservation: {
    numberInQueue,
    pickupBranch,
    expiryDate,
    pickupDeadline,
    dateOfReservation,
    pickupNumber,
    reservationIds
  }
}) => {
  const config = useConfig();
  const t = useText();
  const { open } = useModalButtonHandler();
  const queryClient = useQueryClient();
  const { mutate } = useUpdateReservations();
  const interestPeriods = config<Periods>("interestPeriodsConfig", {
    transformer: "jsonParse"
  });
  const [selectedInterest, setSelectedInterest] = useState<number | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<
    string | undefined | null
  >(pickupBranch);
  const [reservationStatus, setReservationStatus] =
    useState<RequestStatus>("idle");
  const openModal = (type: ModalReservationFormTextType) => () => {
    open(modalReservationFormId(type));
  };
  const branches = config<AgencyBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });
  const blacklistBranches = config("blacklistedPickupBranchesConfig", {
    transformer: "stringToArray"
  });
  const whitelistBranches = excludeBlacklistedBranches(
    branches,
    blacklistBranches
  );
  const isReadyForPickup = getReadyForPickup([reservation]).length > 0;

  const saveChanges = (formSelectValue: FormSelectValue) => {
    setReservationStatus("pending");
    if (!reservationIds || reservationIds.length === 0 || !selectedBranch) {
      // eslint-disable-next-line no-console
      console.error("Missing reservationId or selectedBranch");
      setReservationStatus("error");
      return;
    }

    const reservationsChanges = getReservationsForSaving({
      formSelectValue,
      reservationIds,
      expiryDate,
      selectedBranch
    });

    mutate(
      {
        data: {
          reservations: reservationsChanges
        }
      },
      {
        onSuccess: () => {
          setReservationStatus("success");
          queryClient.invalidateQueries(getGetReservationsV2QueryKey());
        },
        onError: () => {
          setReservationStatus("error");
        }
      }
    );
  };

  return (
    <>
      {numberInQueue && (
        <ListDetails
          icon={EbookIcon}
          title={t("reservationDetailsStatusTitleText")}
          labels={[
            t("reservationDetailsNumberInQueueLabelText", {
              placeholders: { "@count": numberInQueue }
            })
          ]}
        />
      )}
      {pickupBranch && (
        <>
          <ReservationFormListItem
            icon={LocationIcon}
            title={t("reservationDetailsPickUpAtTitleText")}
            text={getPreferredBranch(
              selectedBranch ?? pickupBranch,
              whitelistBranches
            )}
            changeHandler={openModal("pickup")}
            buttonAriaLabel={t("changePickupLocationText")}
            subText={pickupNumber ?? ""}
            isPossibleToChangeReservationDetails={!isReadyForPickup}
          />
          {!isReadyForPickup && (
            <PickupModal
              branches={whitelistBranches}
              defaultBranch={pickupBranch}
              selectBranchHandler={setSelectedBranch}
              saveCallback={saveChanges}
              reservationStatus={reservationStatus}
              setReservationStatus={setReservationStatus}
            />
          )}
        </>
      )}
      {expiryDate && (
        <>
          <ReservationFormListItem
            icon={LoanHistoryIcon}
            title={t("reservationDetailsNoInterestAfterTitleText")}
            text={
              selectedInterest
                ? formatDate(getFutureDateString(selectedInterest))
                : formatDate(expiryDate)
            }
            changeHandler={openModal("interestPeriod")}
            buttonAriaLabel={t("changeInterestPeriodText")}
            isPossibleToChangeReservationDetails={!isReadyForPickup}
          />
          {!isReadyForPickup && (
            <NoInterestAfterModal
              selectedInterest={
                selectedInterest ??
                Number(interestPeriods.defaultInterestPeriod.value)
              }
              setSelectedInterest={setSelectedInterest}
              saveCallback={saveChanges}
              reservationStatus={reservationStatus}
              setReservationStatus={setReservationStatus}
            />
          )}
        </>
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
          title={t("reservationDetailsDateOfReservationTitleText")}
          labels={[formatDate(dateOfReservation)]}
        />
      )}
    </>
  );
};

export default PhysicalListDetails;
