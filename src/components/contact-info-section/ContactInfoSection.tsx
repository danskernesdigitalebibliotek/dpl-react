import React, { FC } from "react";
import clsx from "clsx";
import { PatronV5, PatronSettingsV3 } from "../../core/fbs/model";
import { useConfig } from "../../core/utils/config";
import ContactInfoInputs from "./ContactInfoInputs";
import ContactInfoPhone from "./ContactInfoPhone";
import ContactInfoEmail from "./ContactInfoEmail";
import { ChangePatronProps } from "./types";

interface ContactInfoSectionProps {
  patron: PatronV5 | PatronSettingsV3 | null;
  inLine: boolean;
  changePatron: ChangePatronProps;
  showCheckboxes: boolean;
  requiredFields?: ("email" | "phone")[];
}

const ContactInfoSection: FC<ContactInfoSectionProps> = ({
  patron,
  inLine,
  changePatron,
  showCheckboxes,
  requiredFields = []
}) => {
  const inputsClass = clsx("dpl-input", { input__desktop: inLine });
  const config = useConfig();
  const textNotificationsEnabledConfig =
    config("textNotificationsEnabledConfig") === "1";

  return (
    <section
      data-cy="patron-page-contact-info"
      className="create-patron-page__row"
    >
      <ContactInfoInputs isInline={inLine}>
        <ContactInfoPhone
          className={inputsClass}
          changePatron={changePatron}
          patron={patron}
          isRequired={requiredFields.includes("phone")}
          showCheckboxes={showCheckboxes && textNotificationsEnabledConfig}
        />
        <ContactInfoEmail
          className={clsx(inputsClass, {
            "mt-32": !textNotificationsEnabledConfig && !inLine
          })}
          changePatron={changePatron}
          patron={patron}
          isRequired={requiredFields.includes("email")}
          showCheckboxes={showCheckboxes}
        />
      </ContactInfoInputs>
    </section>
  );
};

export default ContactInfoSection;
