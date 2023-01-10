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
import { excludeBlacklistedBranches } from "../../core/utils/branches";

export interface UserListItemsProps {
  patron: PatronV5;
  branches: AgencyBranch[];
  selectedBranch: string | null;
  selectBranchHandler: (value: string) => void;
  selectedInterest: number | null;
  setSelectedInterest: (value: number) => void;
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
  const blacklistBranches = config("blacklistedPickupBranchesConfig", {
    transformer: "stringToArray"
  });

  const whitelistBranches = excludeBlacklistedBranches(
    branches,
    blacklistBranches
  );

  const { open } = useModalButtonHandler();
  const openModal = (type: ModalReservationFormTextType) => () => {
    open(modalReservationFormId(type));
  };

  const interestPeriod = selectedInterest
    ? getNoInterestAfter(selectedInterest, t)
    : getNoInterestAfter(defaultInterestPeriod, t);

  const pickupBranch = selectedBranch
    ? getPreferredBranch(selectedBranch, branches)
    : getPreferredBranch(preferredPickupBranch, branches);

  return (
    <>
      {defaultInterestPeriod && (
        <>
          <ReservationFormListItem
            icon={LoanHistory}
            title={t("haveNoInterestAfterText")}
            text={interestPeriod}
            changeHandler={openModal("interestPeriod")}
          />
          <NoInterestAfterModal
            selectedInterest={selectedInterest ?? defaultInterestPeriod}
            setSelectedInterest={setSelectedInterest}
          />
        </>
      )}
      {preferredPickupBranch && whitelistBranches && (
        <>
          <ReservationFormListItem
            icon={Location}
            title={t("pickupLocationText")}
            text={pickupBranch}
            changeHandler={openModal("pickup")}
          />
          <PickupModal
            branches={whitelistBranches}
            defaultBranch={selectedBranch ?? preferredPickupBranch}
            selectBranchHandler={selectBranchHandler}
          />
        </>
      )}
      <>
        {smsNotificationsIsEnabled(
          config("smsNotificationsForReservationsEnabledConfig")
        ) && (
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
