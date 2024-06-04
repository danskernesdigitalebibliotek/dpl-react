import React from "react";
import { PatronV5 } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";
import ModalReservationFormText from "./ModalReservationFormText";

export interface EmailModalProps {
  patron: PatronV5;
}

export const EmailModalId = "reservation-form-email";

const EmailModal = ({ patron, patron: { emailAddress } }: EmailModalProps) => {
  const t = useText();
  return (
    <ModalReservationFormText
      type="email"
      defaultText={emailAddress}
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
