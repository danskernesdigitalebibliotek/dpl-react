import * as React from "react";
import { FC } from "react";
import { PatronSettingsV6 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
import CheckBox from "../checkbox/Checkbox";
import { ChangePatronProps } from "./types";
import TextInput from "../forms/input/TextInput";
import { Patron } from "../../core/utils/types/entities";
import {
  patronEmail,
  patronRecieveEmail
} from "../../core/utils/helpers/patron";

export interface ContactInfoEmailProps {
  className?: string;
  patron: Patron | PatronSettingsV6 | null;
  changePatron: ChangePatronProps;
  showCheckboxes: boolean;
  isRequired?: boolean;
}

const ContactInfoEmail: FC<ContactInfoEmailProps> = ({
  className = "",
  patron,
  changePatron,
  showCheckboxes,
  isRequired = false
}) => {
  const t = useText();
  return (
    <>
      <TextInput
        className={className}
        id="email-address-input"
        type="email"
        required={isRequired}
        onChange={(newEmail) => changePatron(newEmail, "emailAddress")}
        value={patron ? patronEmail(patron) : ""}
        label={t("patronContactEmailLabelText")}
      />
      {showCheckboxes && (
        <CheckBox
          className="mt-8 mb-16"
          onChecked={(newReceiveEmail: boolean) =>
            changePatron(newReceiveEmail, "receiveEmail")
          }
          id="email-messages"
          selected={patron ? patronRecieveEmail(patron) : false}
          disabled={false}
          label={t("patronContactEmailCheckboxText")}
        />
      )}
    </>
  );
};

export default ContactInfoEmail;
