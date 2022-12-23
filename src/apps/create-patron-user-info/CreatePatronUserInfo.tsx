import React, { FC, useState } from "react";
import { set } from "lodash";
import PincodeSection from "../patron-page/sections/PincodeSection";
import BranchesDropdown from "../patron-page/util/BranchesDropdown";
import { PatronV5 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
import ContactInfoSection from "../../components/contact-info-section/ContactInfoSection";
import { Button } from "../../components/Buttons/Button";

const CreatePatronUserInfo: FC = () => {
  const t = useText();
  const [pin, setPin] = useState<string | null>(null);
  const [patron, setPatron] = useState<PatronV5 | null>(null);

  // Changes the patron object by key.
  // So using the paramters 123 and "phoneNumber" would change the phoneNumber to 123.
  const changePatron = (newValue: string | boolean, key: string) => {
    // Deeeep copy
    const copyUser = JSON.parse(JSON.stringify(patron));
    set(copyUser, key, newValue);
    setPatron(copyUser);
  };

  return (
    <form className="dpl-patron-page">
      <h1 className="text-header-h1 mb-48">
        {t("createPatronUserInfoHeaderText")}
      </h1>
      <ContactInfoSection inLine changePatron={changePatron} patron={patron} />
      {t("createPatronUserInfoChangePickupHeaderText") && (
        <h2 className="text-body-small-regular mt-32 mb-16">
          {t("createPatronUserInfoChangePickupHeaderText")}
        </h2>
      )}
      {t("createPatronUserInfoChangePickupBodyText") && (
        <p className="text-body-small-regular">
          {t("createPatronUserInfoChangePickupBodyText")}
        </p>
      )}
      <BranchesDropdown
        classNames="dropdow dropdown__desktop"
        selected={patron?.preferredPickupBranch || ""}
        onChange={(newPreferredPickupBranch) =>
          changePatron(newPreferredPickupBranch, "preferredPickupBranch")
        }
      />
      <PincodeSection changePincode={setPin} />
      <div className="patron-buttons">
        <Button
          label={t("createPatronUserInfoConfirmButtonText")}
          buttonType="none"
          variant="filled"
          disabled={false}
          collapsible={false}
          size="small"
        />
        <button type="button" className="link-tag mx-16">
          {t("createPatronUserInfoCancelButtonText")}
        </button>
      </div>
    </form>
  );
};

export default CreatePatronUserInfo;
