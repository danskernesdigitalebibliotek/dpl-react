import * as React from "react";
import Location from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import Subtitles from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Subtitles.svg";
import Message from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Message.svg";
import LoanHistory from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/LoanHistory.svg";
import { FC } from "react";
import { useText } from "../../core/utils/text";
import ReservationFormListItem from "./ReservationFormListItem";
import {
  getNoInterestAfter,
  getPreferredLocation
} from "../../apps/material/helper";
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
import { smsNotificationsIsEnabled } from "./helper";

export interface UserListItemsProps {
  patron: PatronV5;
  branchData: AgencyBranch[];
}

const UserListItems: FC<UserListItemsProps> = ({
  patron,
  patron: {
    defaultInterestPeriod,
    preferredPickupBranch,
    phoneNumber,
    emailAddress
  },
  branchData
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
        <ReservationFormListItem
          icon={LoanHistory}
          title={t("haveNoInterestAfterText")}
          text={getNoInterestAfter(defaultInterestPeriod, t)}
          changeHandler={() => {}} // TODO: open modal to switch user data
        />
      )}
      {preferredPickupBranch && branchData && (
        <ReservationFormListItem
          icon={Location}
          title={t("pickupLocationText")}
          text={getPreferredLocation(preferredPickupBranch, branchData)}
          changeHandler={() => {}} // TODO: open modal to switch user data
        />
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
