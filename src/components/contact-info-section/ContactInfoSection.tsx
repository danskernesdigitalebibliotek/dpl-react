import React, { FC } from "react";
import { PatronV5 } from "../../core/fbs/model";
import TextInput from "../atoms/input/TextInput";
import CheckBox from "../checkbox/Checkbox";
import { useText } from "../../core/utils/text";

export interface ChangePatronProps {
  (newValue: string | boolean, key: string): void;
}

interface ContactInfoSectionProps {
  patron: PatronV5 | null;
  changePatron: ChangePatronProps;
}

const ContactInfoSection: FC<ContactInfoSectionProps> = ({
  patron,
  changePatron
}) => {
  const t = useText();

  return (
    <section data-cy="patron-page-contact-info">
      <h2 className="text-body-small-regular mt-32 mb-16">
        {t("patronContactInfoHeaderText")}
      </h2>
      {t("patronContactInfoBreadText") && (
        <p className="text-body-small-regular mb-32">
          {t("patronContactInfoBreadText")}
        </p>
      )}
      <TextInput
        className="dpl-input input__desktop"
        id="phone-input"
        type="number"
        onChange={(newPhoneNumber) =>
          changePatron(newPhoneNumber, "phoneNumber")
        }
        value={patron?.phoneNumber}
        label={t("patronContactPhoneLabelText")}
      />
      <CheckBox
        className="mt-32 mb-16"
        onChecked={(newReceiveSms: boolean) =>
          changePatron(newReceiveSms, "receiveSms")
        }
        id="phone-messages"
        selected={patron?.receiveSms}
        disabled={false}
        label={t("patronContactPhoneCheckboxText")}
      />
      <TextInput
        className="dpl-input input__desktop"
        id="email-address-input"
        type="email"
        onChange={(newEmail) => changePatron(newEmail, "emailAddress")}
        value={patron?.emailAddress}
        label={t("patronContactEmailLabelText")}
      />
      <CheckBox
        className="mt-32 mb-16"
        onChecked={(newReceiveEmail: boolean) =>
          changePatron(newReceiveEmail, "receiveEmail")
        }
        id="email-messages"
        selected={patron?.receiveEmail}
        disabled={false}
        label={t("patronContactEmailCheckboxText")}
      />
    </section>
  );
};

export default ContactInfoSection;
