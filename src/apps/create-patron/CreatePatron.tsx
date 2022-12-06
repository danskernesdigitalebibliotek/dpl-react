import React, { FC, useState } from "react";
import { set } from "lodash";
import PincodeSection from "../patron-page/sections/PincodeSection";
import BranchesDropdown from "../patron-page/util/BranchesDropdown";
import { PatronV5 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
import { createV4 } from "../../core/fbs/fbs";
import ContactInfoSection from "../../components/contact-info-section/ContactInfoSection";

const CreatePatron: FC = () => {
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
      <ContactInfoSection changePatron={changePatron} patron={patron} />
      <h2 className="text-body-small-regular mt-32 mb-16">
        {t("createPatronChangePickupHeaderText")}
      </h2>
      {t("createPatronChangePickupBreadText") && (
        <p className="text-body-small-regular">
          {t("createPatronChangePickupBreadText")}
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
    </form>
  );
};

export default CreatePatron;
