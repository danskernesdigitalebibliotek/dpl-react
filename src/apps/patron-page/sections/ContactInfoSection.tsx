import React, { FC } from "react";
import { PatronV5 } from "../../../core/fbs/model";
import TextInput from "../../../components/atoms/input/TextInput";
import CheckBox from "../../../components/checkbox/Checkbox";
import { useText } from "../../../core/utils/text";
import { ChangePatronProps } from "./ReservationDetailsSection";

interface ContactInfoSectionProps {
  patron: PatronV5;
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
        {t("patronPageContactInfoHeaderText")}
      </h2>
      {t("patronPageContactInfoBodyText") && (
        <p className="text-body-small-regular mb-32">
          {t("patronPageContactInfoBodyText")}
        </p>
      )}
      <TextInput
        className="patron__input patron__input--desktop"
        id="phone-input"
        type="number"
        onChange={(newPhoneNumber) =>
          changePatron(newPhoneNumber, "phoneNumber")
        }
        value={patron?.phoneNumber}
        label={t("patronPageContactPhoneLabelText")}
      />
      <CheckBox
        className="mt-32 mb-16"
        onChecked={(newReceiveSms: boolean) =>
          changePatron(newReceiveSms, "receiveSms")
        }
        id="phone-messages"
        selected={patron?.receiveSms}
        disabled={false}
        label={t("patronPageContactPhoneCheckboxText")}
      />
      <TextInput
        className="patron__input patron__input--desktop"
        id="email-address-input"
        type="email"
        onChange={(newEmail) => changePatron(newEmail, "emailAddress")}
        value={patron?.emailAddress}
        label={t("patronPageContactEmailLabelText")}
      />
      <CheckBox
        className="mt-32 mb-16"
        onChecked={(newReceiveEmail: boolean) =>
          changePatron(newReceiveEmail, "receiveEmail")
        }
        id="email-messages"
        selected={patron?.receiveEmail}
        disabled={false}
        label={t("patronPageContactEmailCheckboxText")}
      />
    </section>
  );
};

export default ContactInfoSection;
