import React from "react";
import { PatronV5 } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";
import ModalReservationFormText from "./ModalReservationFormText";

export interface SmsModalProps {
  patron: PatronV5;
}

const SmsModal = ({ patron, patron: { phoneNumber } }: SmsModalProps) => {
  const t = useText();
  return (
    <ModalReservationFormText
      type="sms"
      defaultText={phoneNumber}
      header={{
        title: t("modalReservationFormSmsHeaderTitleText"),
        description: [t("modalReservationFormSmsHeaderDescriptionText")]
      }}
      inputField={{
        label: t("modalReservationFormSmsInputFieldLabelText"),
        description: t("modalReservationFormSmsInputFieldDescriptionText")
      }}
      patron={patron}
    />
  );
};

export default SmsModal;
