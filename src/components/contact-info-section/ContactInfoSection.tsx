import React, { FC } from "react";
import clsx from "clsx";
import { PatronV5, PatronSettingsV3 } from "../../core/fbs/model";
import TextInput from "../atoms/input/TextInput";
import CheckBox from "../checkbox/Checkbox";
import { useText } from "../../core/utils/text";
import { useConfig } from "../../core/utils/config";

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
  const inputsClass = clsx("dpl-input", { input__desktop: inLine });
  const config = useConfig();
  const textNotificationsEnabled =
    config("textNotificationsEnabledConfig") === "true";

  const phoneNode = (
    <>
      <TextInput
        className={inputsClass}
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
  const emailNode = (
    <>
      <TextInput
        className={clsx(inputsClass, { "mt-32": !textNotificationsEnabled })}
        id="email-address-input"
        type="email"
        required
        onChange={(newEmail) => changePatron(newEmail, "emailAddress")}
        value={patron?.emailAddress}
        label={t("patronContactEmailLabelText")}
      />
      {showCheckboxes && textNotificationsEnabled && (
        <CheckBox
          className="mt-8 mb-16"
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
      <h2 className="text-header-h4 mt-32 mb-16">
        {t("patronContactInfoHeaderText")}
      </h2>
      {t("patronContactInfoBodyText") && (
        <p className="text-body-small-regular mb-32">
          {t("patronContactInfoBodyText")}
        </p>
      )}
      {inLine && (
        <>
          <div className="patron__input--desktop mr-16">{phoneNode}</div>
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
