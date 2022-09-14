import React from "react";
import { PatronV5 } from "../../../core/fbs/model";
import ModalReservationFormText from "./ModalReservationFormText";

export interface SmsModalProps {
  patron: PatronV5;
}

const SmsModal = ({ patron, patron: { phoneNumber } }: SmsModalProps) => {
  return (
    <ModalReservationFormText
      type="sms"
      defaultText={phoneNumber}
      header={{
        title: "Ændring af telefonnummer",
        description: [
          "Hvis du ønsker at få notifikationer på sms kan du indtaste eller ændre dit telefonnummer hér."
        ]
      }}
      inputField={{
        label: "Telefonnummer",
        description: "Indtast telefonnummer"
      }}
      patron={patron}
    />
  );
};

export default SmsModal;
