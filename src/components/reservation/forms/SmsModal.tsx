import React from "react";
import { PatronV5 } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";
import ModalReservationFormText from "./ModalReservationFormText";
import { Patron } from "../../../core/utils/types/entities";
import { patronPhoneNumber } from "../../../core/utils/helpers/patron";

export interface SmsModalProps {
  patron: Patron;
}

const SmsModal = ({ patron }: SmsModalProps) => {
  const t = useText();
  return (
    <ModalReservationFormText
      type="sms"
      defaultText={patronPhoneNumber(patron)}
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
