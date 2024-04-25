import React, { FC, useState, useRef, FormEvent } from "react";
import { set } from "lodash";
import PincodeSection from "../patron-page/sections/PincodeSection";
import BranchesDropdown from "../patron-page/util/BranchesDropdown";
import { PatronSettingsV3 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
import ContactInfoSection from "../../components/contact-info-section/ContactInfoSection";
import { useCreateV4 } from "../../core/fbs/fbs";
import { patronAgeValid } from "../../core/utils/helpers/general";
import { useConfig } from "../../core/utils/config";
import { redirectTo } from "../../core/utils/helpers/url";
import { useUrls } from "../../core/utils/url";
import Link from "../../components/atoms/links/Link";

export interface UserInfoProps {
  cpr: string;
}

const UserInfo: FC<UserInfoProps> = ({ cpr }) => {
  const t = useText();
  const u = useUrls();
  const logoutUrl = u("logoutUrl");
  const redirectOnUserCreatedUrl = u("redirectOnUserCreatedUrl");
  const config = useConfig();
  const formRef = useRef<HTMLFormElement>(null);
  const [pin, setPin] = useState<string | null>(null);
  const minAge = parseInt(config("minAgeConfig"), 10);
  const [validCpr] = useState<boolean>(patronAgeValid(cpr, minAge));
  const { mutate } = useCreateV4();
  const [patron, setPatron] = useState<PatronSettingsV3>({
    preferredPickupBranch: "",
    receiveEmail: true,
    receivePostalMail: false,
    receiveSms: false,
    phoneNumber: "",
    emailAddress: ""
  });
  const getSubmitButtonText = () => {
    if (isLoading) {
      return t("createPatronButtonLoadingText");
    }
    if (isSubmitError) {
      return t("createPatronButtonErrorText");
    }
    return t("createPatronConfirmButtonText");
  };
  // Changes the patron object by key.
  // So using the parameters 123 and "phoneNumber" would change the phoneNumber to 123.
  const changePatron = (newValue: string | boolean, key: string) => {
    // Deep copy
    const copyUser = JSON.parse(JSON.stringify(patron));
    set(copyUser, key, newValue);
    setPatron(copyUser);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { preferredPickupBranch, phoneNumber, emailAddress } = patron;
    if (pin && preferredPickupBranch && phoneNumber && emailAddress) {
      mutate(
        {
          data: { cprNumber: cpr, patron, pincode: pin }
        },
        {
          onSuccess: () => {
            redirectTo(redirectOnUserCreatedUrl);
          }
        }
      );
    }
  };

  return (
    <>
      {validCpr && (
        <form
          onSubmit={(e) => handleSubmit(e)}
          ref={formRef}
          className="dpl-patron-page"
        >
          <h1 className="text-header-h1 mb-48">
            {t("createPatronHeaderText")}
          </h1>
          <ContactInfoSection
            showCheckboxes={false}
            inLine
            changePatron={changePatron}
            patron={patron}
            requiredFields={["email"]}
          />
          <PincodeSection required changePincode={setPin} />
          {t("createPatronChangePickupHeaderText") && (
            <h2 className="text-subtitle mt-32 mb-16">
              {t("createPatronChangePickupHeaderText")}
            </h2>
          )}
          {t("createPatronChangePickupBodyText") && (
            <p className="text-body-small-regular my-32">
              {t("createPatronChangePickupBodyText")}
            </p>
          )}
          <div className="mt-32">
            <BranchesDropdown
              classNames="dropdow dropdown__desktop"
              selected={patron?.preferredPickupBranch || ""}
              onChange={(newPreferredPickupBranch) =>
                changePatron(newPreferredPickupBranch, "preferredPickupBranch")
              }
            />
          </div>
          <div className="patron-buttons">
            <button
              type="submit"
              className="btn-primary btn-filled btn-small"
              data-cy="complete-user-registration-button"
            >
              {getSubmitButtonText()}
            </button>
            <Link
              href={logoutUrl}
              className="link-tag mx-16 mt-8"
              dataCy="cancel-user-registration-button"
            >
              {t("createPatronCancelButtonText")}
            </Link>
          </div>
        </form>
      )}
      {!validCpr && (
        <div className="dpl-patron-page">
          <h1 className="text-header-h1 mb-48">
            {t("createPatronInvalidSsnHeaderText")}
          </h1>
          <p>{t("createPatronInvalidSsnBodyText")}</p>
        </div>
      )}
    </>
  );
};

export default UserInfo;
