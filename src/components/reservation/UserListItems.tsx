import React, { FC } from "react";
import Location from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import Subtitles from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Subtitles.svg";
import Message from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Message.svg";
import LoanHistory from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/LoanHistory.svg";
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
  smsNotificationsIsEnabled,
  getPreferredBranch,
  getNoInterestAfter
} from "./helper";
import PickupModal from "./forms/PickupModal";
import NoInterestAfterModal from "./forms/NoInterestAfterModal";

export interface UserListItemsProps {
  patron: PatronV5;
  branches: AgencyBranch[];
  selectedBranch: string;
  selectBranchHandler: (value: string) => void;
  selectedInterest: string;
  setSelectedInterest: (value: string) => void;
}

const UserListItems: FC<UserListItemsProps> = ({
  patron,
  patron: {
    defaultInterestPeriod,
    preferredPickupBranch,
    phoneNumber,
    emailAddress
  },
  branches,
  selectedBranch,
  selectBranchHandler,
  selectedInterest,
  setSelectedInterest
}) => {
  const t = useText();

  const config = useConfig();
  const { open } = useModalButtonHandler();
  const openModal = (type: ModalReservationFormTextType) => () => {
    open(modalReservationFormId(type));
  };

  return (
    <>
      {defaultInterestPeriod && (
        <>
          <ReservationFormListItem
            icon={LoanHistory}
            title={t("haveNoInterestAfterText")}
            text={getNoInterestAfter(selectedInterest, t)}
            changeHandler={openModal("interestPeriod")}
          />
          <NoInterestAfterModal
            selectedInterest={selectedInterest}
            setSelectedInterest={setSelectedInterest}
          />
        </>
      )}
      {preferredPickupBranch && branches && (
        <>
          <ReservationFormListItem
            icon={Location}
            title={t("pickupLocationText")}
            text={getPreferredBranch(selectedBranch, branches)}
            changeHandler={openModal("pickup")}
          />
          <PickupModal
            branches={branches}
            defaultBranch={selectedBranch}
            selectBranchHandler={selectBranchHandler}
          />
        </>
      )}
      <>
        {smsNotificationsIsEnabled(config) && (
          <>
            <ReservationFormListItem
              icon={Subtitles}
              title={t("receiveSmsWhenMaterialReadyText")}
              text={stringifyValue(phoneNumber)}
              changeHandler={openModal("sms")}
            />
            <SmsModal patron={patron} />
          </>
        )}
        <ReservationFormListItem
          icon={Message}
          title={t("receiveEmailWhenMaterialReadyText")}
          text={stringifyValue(emailAddress)}
          changeHandler={openModal("email")}
        />
        <EmailModal patron={patron} />
      </>
    </>
  );
};

export default UserListItems;
