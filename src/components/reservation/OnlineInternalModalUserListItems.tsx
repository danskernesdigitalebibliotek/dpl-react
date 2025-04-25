import React, { FC } from "react";
import SubtitlesIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Subtitles.svg";
import MessageIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Message.svg";
import { useText } from "../../core/utils/text";
import ReservationFormListItem from "./ReservationFormListItem";
import { useModalButtonHandler } from "../../core/utils/modal";
import EmailModal from "./forms/EmailModal";
import {
  modalReservationFormId,
  ModalReservationFormTextType
} from "./forms/helper";
import SmsModal from "./forms/SmsModal";
import { stringifyValue } from "../../core/utils/helpers/general";
import { useConfig } from "../../core/utils/config";
import { isConfigValueOne } from "./helper";

import { RequestStatus } from "../../core/utils/types/request";
import { Patron } from "../../core/utils/types/entities";

export interface OnlineInternalModalUserListItemsProps {
  patron: Patron;
  reservationStatus: RequestStatus;
}

const OnlineInternalModalUserListItems: FC<
  OnlineInternalModalUserListItemsProps
> = ({ patron, patron: { phoneNumber, emailAddress } }) => {
  const t = useText();
  const config = useConfig();

  const { open } = useModalButtonHandler();
  const openModal = (type: ModalReservationFormTextType) => () => {
    open(modalReservationFormId(type));
  };

  return (
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
  );
};

export default OnlineInternalModalUserListItems;
