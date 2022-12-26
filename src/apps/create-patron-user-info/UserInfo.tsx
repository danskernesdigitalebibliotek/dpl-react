import React, { FC, useState, useRef } from "react";
import { set } from "lodash";
import PincodeSection from "../patron-page/sections/PincodeSection";
import BranchesDropdown from "../patron-page/util/BranchesDropdown";
import { PatronSettingsV3 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
import ContactInfoSection from "../../components/contact-info-section/ContactInfoSection";
import { useCreateV4 } from "../../core/fbs/fbs";

const UserInfo: FC = () => {
  const t = useText();
  const formRef = useRef<HTMLFormElement>(null);
  const [pin, setPin] = useState<string | null>(null);
  const { mutate } = useCreateV4();
  const [patron, setPatron] = useState<PatronSettingsV3>({
    preferredPickupBranch: "",
    receiveEmail: false,
    receivePostalMail: false,
    receiveSms: false,
    phoneNumber: "",
    emailAddress: ""
  });

  // Changes the patron object by key.
  // So using the paramters 123 and "phoneNumber" would change the phoneNumber to 123.
  const changePatron = (newValue: string | boolean, key: string) => {
    // Deeeep copy
    const copyUser = JSON.parse(JSON.stringify(patron));
    set(copyUser, key, newValue);
    setPatron(copyUser);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const { preferredPickupBranch, phoneNumber, emailAddress } = patron;
    if (pin && preferredPickupBranch && phoneNumber && emailAddress) {
      mutate(
        {
          data: { cprNumber: "", patron, pincode: pin }
        },
        {
          onSuccess: (result) => {
            console.log(result);
          },
          // todo error handling, missing in figma
          onError: () => {}
        }
      );
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      ref={formRef}
      className="dpl-patron-page"
    >
      <h1 className="text-header-h1 mb-48">{t("createPatronHeaderText")}</h1>
      <ContactInfoSection inLine changePatron={changePatron} patron={patron} />
      {t("createPatronChangePickupHeaderText") && (
        <h2 className="text-body-small-regular mt-32 mb-16">
          {t("createPatronChangePickupHeaderText")}
        </h2>
      )}
      {t("createPatronChangePickupBodyText") && (
        <p className="text-body-small-regular">
          {t("createPatronChangePickupBodyText")}
        </p>
      )}
      <BranchesDropdown
        classNames="dropdow dropdown__desktop"
        selected={patron?.preferredPickupBranch || ""}
        onChange={(newPreferredPickupBranch) =>
          changePatron(newPreferredPickupBranch, "preferredPickupBranch")
        }
      />
      <PincodeSection required changePincode={setPin} />
      <div className="patron-buttons">
        <input
          type="submit"
          className="btn-primary btn-filled btn-small"
          value={t("createPatronConfirmButtonText")}
        />
      </div>
      <button
        type="button"
        className="link-tag mx-16"
        // todo, click cancel, what then?
        // eslint-disable-next-line no-console
        onClick={() => console.log("What now ddb?")}
      >
        {t("createPatronCancelButtonText")}
      </button>
    </form>
  );
};

export default UserInfo;
