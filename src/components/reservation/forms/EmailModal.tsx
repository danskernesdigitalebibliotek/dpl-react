import React from "react";
import { PatronV5 } from "../../../core/fbs/model";
import ModalReservationFormText from "./ModalReservationFormText";

export interface EmailModalProps {
  patron: PatronV5;
}

export const EmailModalId = "reservation-form-email";

const EmailModal = ({ patron, patron: { emailAddress } }: EmailModalProps) => {
  return (
    <ModalReservationFormText
      type="email"
      defaultText={emailAddress}
      header={{
        title: "Ændring af email",
        description: [
          "Hvis du ønsker at få notifikationer på e-mail kan du indtaste eller ændre den ønskede e-mail hér."
        ]
      }}
      inputField={{ label: "Email", description: "Indtast email" }}
      patron={patron}
    />
  );
};

export default EmailModal;
