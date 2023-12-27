import React, { FC } from "react";
import LocationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import SubtitlesIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Subtitles.svg";
import MessageIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Message.svg";
import LoanHistoryIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/LoanHistory.svg";
import { useText } from "../../core/utils/text";
import ReservationFormListItem from "./ReservationFormListItem";
import { AgencyBranch, PatronV5 } from "../../core/fbs/model";
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

export interface UserListItemsProps {
  patron: PatronV5;
  branches: AgencyBranch[];
  selectedBranch: string | null;
  selectBranchHandler: (value: string) => void;
  selectedInterest: number | null;
  setSelectedInterest: (value: number) => void;
  whitelistBranches: AgencyBranch[];
}

const UserListItems: FC<UserListItemsProps> = ({
  patron,
  patron: { preferredPickupBranch, phoneNumber, emailAddress },
  branches,
  selectedBranch,
  selectBranchHandler,
  selectedInterest,
  setSelectedInterest,
  whitelistBranches
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
              selectedInterest ??
              Number(interestPeriods.defaultInterestPeriod.value)
            }
            setSelectedInterest={setSelectedInterest}
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
              text={stringifyValue(phoneNumber)}
              changeHandler={openModal("sms")}
              buttonAriaLabel={t("changeSmsNumberText")}
            />
            <SmsModal patron={patron} />
          </>
        )}
        <ReservationFormListItem
          icon={MessageIcon}
          title={t("receiveEmailWhenMaterialReadyText")}
          text={stringifyValue(emailAddress)}
          changeHandler={openModal("email")}
          buttonAriaLabel={t("changeEmailText")}
        />
        <EmailModal patron={patron} />
      </>
    </>
  );
};

export default UserListItems;
