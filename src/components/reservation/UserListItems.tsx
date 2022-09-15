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

export interface UserListItemsProps {
  patron: PatronV5;
  branchData: AgencyBranch[];
}

const UserListItems: FC<UserListItemsProps> = ({
  patron: {
    defaultInterestPeriod,
    preferredPickupBranch,
    phoneNumber,
    emailAddress
  },
  branchData
}) => {
  const t = useText();
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
      {phoneNumber && (
        <ReservationFormListItem
          icon={Subtitles}
          title={t("receiveSmsWhenMaterialReadyText")}
          text={phoneNumber}
          changeHandler={() => {}} // TODO: open modal to switch user data
        />
      )}
      {emailAddress && (
        <ReservationFormListItem
          icon={Message}
          title={t("receiveEmailWhenMaterialReadyText")}
          text={emailAddress}
          changeHandler={() => {}} // TODO: open modal to switch user data
        />
      )}
    </>
  );
};

export default UserListItems;
