import * as React from "react";
import { FC } from "react";
import { PatronSettingsV3, PatronV5 } from "../../core/fbs/model";
import CheckBox from "../checkbox/Checkbox";
import { useText } from "../../core/utils/text";
import { ChangePatronProps } from "./types";
import TextInput from "../forms/input/TextInput";

export interface ContactInfoPhoneProps {
  patron: PatronV5 | PatronSettingsV3 | null;
  changePatron: ChangePatronProps;
  showCheckboxes: boolean;
  className?: string;
  isRequired?: boolean;
}

const ContactInfoPhone: FC<ContactInfoPhoneProps> = ({
  patron,
  changePatron,
  showCheckboxes,
  className = "",
  isRequired = false
}) => {
  const t = useText();
  return (
    <>
      <TextInput
        className={className}
        id="phone-input"
        required={isRequired}
        type="tel"
        pattern="\+?[0-9]{6,15}"
        title={t("patronPagePhoneInputMessageText")}
        onChange={(newPhoneNumber) =>
          changePatron(newPhoneNumber, "phoneNumber")
        }
        value={patron?.phoneNumber}
        label={t("patronContactPhoneLabelText")}
      />
      {showCheckboxes && (
        <CheckBox
          className="mt-8 mb-16"
          onChecked={(newReceiveSms: boolean) =>
            changePatron(newReceiveSms, "receiveSms")
          }
          id="phone-messages"
          selected={patron?.receiveSms}
          disabled={false}
          label={t("patronContactPhoneCheckboxText")}
        />
      )}
    </>
  );
};

export default ContactInfoPhone;
