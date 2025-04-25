import React, { FC } from "react";
import LocationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import SubtitlesIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Subtitles.svg";
import MessageIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Message.svg";
import LoanHistoryIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/LoanHistory.svg";
import { useText } from "../../core/utils/text";
import ReservationFormListItem from "./ReservationFormListItem";
import { AgencyBranch } from "../../core/fbs/model";
import { useModalButtonHandler } from "../../core/utils/modal";
import EmailModal from "./forms/EmailModal";
import {
  modalReservationFormId,
  ModalReservationFormTextType
} from "./forms/helper";
import SmsModal from "./forms/SmsModal";
import { stringifyValue } from "../../core/utils/helpers/general";
import { useConfig } from "../../core/utils/config";
import {
  isConfigValueOne,
  getPreferredBranch,
  getNoInterestAfter
} from "./helper";
import PickupModal from "./forms/PickupModal";
import NoInterestAfterModal from "./forms/NoInterestAfterModal";
import { Periods } from "./types";
import { RequestStatus } from "../../core/utils/types/request";
import { Patron } from "../../core/utils/types/entities";
import {
  patronEmail,
  patronPhoneNumber
} from "../../core/utils/helpers/patron";

export interface UserListItemsProps {
  patron: Patron;
  branches: AgencyBranch[];
  selectedBranch: string | null;
  selectBranchHandler: (value: string) => void;
  selectedInterest: number | null;
  setSelectedInterest: (value: number) => void;
  whitelistBranches: AgencyBranch[];
  reservationStatus: RequestStatus;
}

const UserListItems: FC<UserListItemsProps> = ({
  patron,
  branches,
  selectedBranch,
  selectBranchHandler,
  selectedInterest,
  setSelectedInterest,
  whitelistBranches,
  reservationStatus
}) => {
  const t = useText();
  const config = useConfig();
  const interestPeriods = config<Periods>("interestPeriodsConfig", {
    transformer: "jsonParse"
  });

  const { open } = useModalButtonHandler();
  const openModal = (type: ModalReservationFormTextType) => () => {
    open(modalReservationFormId(type));
  };

  const interestPeriod = selectedInterest
    ? getNoInterestAfter(selectedInterest, interestPeriods, t)
    : getNoInterestAfter(
        Number(interestPeriods.defaultInterestPeriod.value),
        interestPeriods,
        t
      );

  const pickupBranch = selectedBranch
    ? getPreferredBranch(selectedBranch, branches)
    : getPreferredBranch(preferredPickupBranch, branches);

  return (
    <>
      {interestPeriods && (
        <>
          <ReservationFormListItem
            icon={LoanHistoryIcon}
            title={t("reservationDetailsNoInterestAfterTitleText")}
            text={interestPeriod}
            changeHandler={openModal("interestPeriod")}
            buttonAriaLabel={t("changeInterestPeriodText")}
          />
          <NoInterestAfterModal
            selectedInterest={
              selectedInterest ?? interestPeriods.defaultInterestPeriod.value
            }
            setSelectedInterest={setSelectedInterest}
            reservationStatus={reservationStatus}
          />
        </>
      )}
      {preferredPickupBranch && whitelistBranches && (
        <>
          <ReservationFormListItem
            icon={LocationIcon}
            title={t("reservationDetailsPickUpAtTitleText")}
            text={pickupBranch}
            changeHandler={openModal("pickup")}
            buttonAriaLabel={t("changePickupLocationText")}
          />
          <PickupModal
            branches={whitelistBranches}
            defaultBranch={selectedBranch ?? preferredPickupBranch}
            selectBranchHandler={selectBranchHandler}
            reservationStatus={reservationStatus}
          />
        </>
      )}
      <>
        {isConfigValueOne(
          config("smsNotificationsForReservationsEnabledConfig")
        ) && (
          <>
            <ReservationFormListItem
              icon={SubtitlesIcon}
              title={t("receiveSmsWhenMaterialReadyText")}
              text={stringifyValue(patronPhoneNumber(patron))}
              changeHandler={openModal("sms")}
              buttonAriaLabel={t("changeSmsNumberText")}
            />
            <SmsModal patron={patron} />
          </>
        )}
        <ReservationFormListItem
          icon={MessageIcon}
          title={t("receiveEmailWhenMaterialReadyText")}
          text={stringifyValue(patronEmail(patron))}
          changeHandler={openModal("email")}
          buttonAriaLabel={t("changeEmailText")}
        />
        <EmailModal patron={patron} />
      </>
    </>
  );
};

export default UserListItems;
