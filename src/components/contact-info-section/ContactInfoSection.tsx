import React, { FC } from "react";
import { PatronV5, PatronSettingsV3 } from "../../core/fbs/model";
import TextInput from "../atoms/input/TextInput";
import CheckBox from "../checkbox/Checkbox";
import { useText } from "../../core/utils/text";

export interface ChangePatronProps {
  (newValue: string | boolean, key: string): void;
}

interface ContactInfoSectionProps {
  patron: PatronV5 | PatronSettingsV3 | null;
  inLine: boolean;
  changePatron: ChangePatronProps;
  showCheckboxes: boolean;
}

const ContactInfoSection: FC<ContactInfoSectionProps> = ({
  patron,
  inLine,
  changePatron,
  showCheckboxes
}) => {
  const t = useText();

  const phoneNode = (
    <>
      <TextInput
        className={`${inLine ? "dpl-input" : "dpl-input input__desktop"}`}
        id="phone-input"
        required
        type="number"
        onChange={(newPhoneNumber) =>
          changePatron(newPhoneNumber, "phoneNumber")
        }
        value={patron?.phoneNumber}
        label={t("patronContactPhoneLabelText")}
      />
      {showCheckboxes && (
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
      )}
    </>
  );
  const emailNode = (
    <>
      <TextInput
        className={`${inLine ? "dpl-input" : "dpl-input input__desktop"}`}
        id="email-address-input"
        type="email"
        required
        onChange={(newEmail) => changePatron(newEmail, "emailAddress")}
        value={patron?.emailAddress}
        label={t("patronContactEmailLabelText")}
      />
      {showCheckboxes && (
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
      )}
    </>
  );

  return (
    <section
      className={`${inLine ? "contact-info-flex" : ""}`}
      data-cy="patron-page-contact-info"
    >
      {t("patronContactInfoHeaderText") && (
        <h2 className="text-body-small-regular mt-32 mb-16">
          {t("patronContactInfoHeaderText")}
        </h2>
      )}
      {t("patronContactInfoBodyText") && (
        <p className="text-body-small-regular mb-32">
          {t("patronContactInfoBodyText")}
        </p>
      )}
      {inLine && (
        <>
          <div className="patron__input--desktop mr-16">{phoneNode}</div>f{" "}
          <div className="patron__input--desktop">{emailNode}</div>
        </>
      )}
      {!inLine && (
        <>
          {phoneNode} {emailNode}
        </>
      )}
    </section>
  );
};

export default ContactInfoSection;
