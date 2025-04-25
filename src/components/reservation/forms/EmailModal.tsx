import React from "react";
import { useText } from "../../../core/utils/text";
import ModalReservationFormText from "./ModalReservationFormText";
import { Patron } from "../../../core/utils/types/entities";

export interface EmailModalProps {
  patron: Patron;
}

export const EmailModalId = "reservation-form-email";

const EmailModal = ({ patron }: EmailModalProps) => {
  const t = useText();
  return (
    <ModalReservationFormText
      type="email"
      defaultText={patron.emailAddress}
      header={{
        title: t("modalReservationFormEmailHeaderTitleText"),
        description: [t("modalReservationFormEmailHeaderDescriptionText")]
      }}
      inputField={{
        label: t("modalReservationFormEmailInputFieldLabelText"),
        description: t("modalReservationFormEmailInputFieldDescriptionText")
      }}
      patron={patron}
    />
  );
};

export default EmailModal;
