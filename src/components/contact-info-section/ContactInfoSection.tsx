import React, { FC } from "react";
import clsx from "clsx";
import { PatronV5, PatronSettingsV3 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
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
  const textNotificationsEnabledConfig =
    config("textNotificationsEnabledConfig") === "1";

  return (
    <section data-cy="patron-page-contact-info">
      <h2 className="text-header-h4 mt-32 mb-16">
        {t("patronContactInfoHeaderText")}
      </h2>
      {t("patronContactInfoBodyText") && (
        <p className="text-body-small-regular mb-32">
          {t("patronContactInfoBodyText")}
        </p>
      )}
      <ContactInfoInputs isInline={inLine}>
        <ContactInfoPhone
          className={inputsClass}
          changePatron={changePatron}
          patron={patron}
          showCheckboxes={showCheckboxes && textNotificationsEnabledConfig}
        />
        <ContactInfoEmail
          className={clsx(inputsClass, {
            "mt-32": !textNotificationsEnabledConfig && !inLine
          })}
          changePatron={changePatron}
          patron={patron}
          showCheckboxes={showCheckboxes}
        />
      </ContactInfoInputs>
    </section>
  );
};

export default ContactInfoSection;
