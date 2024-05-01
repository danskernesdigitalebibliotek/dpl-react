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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitError, setIsSubmitError] = useState<boolean>(false);
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
    setIsLoading(true);
    const { preferredPickupBranch, emailAddress } = patron;

    if (pin && preferredPickupBranch && emailAddress) {
      mutate(
        {
          data: { cprNumber: cpr, patron, pincode: pin }
        },
        {
          onSuccess: () => {
            setIsLoading(false);
            redirectTo(redirectOnUserCreatedUrl);
          },
          onError: () => {
            setIsLoading(false);
            setIsSubmitError(true);
          }
        }
      );
    }
  };

  return (
    <>
      {validCpr && (
        <div className="create-patron-page">
          <h1 className="create-patron-page__title">
            {t("createPatronHeaderText")}
          </h1>
          <form onSubmit={(e) => handleSubmit(e)} ref={formRef}>
            <ContactInfoSection
              showCheckboxes={false}
              inLine
              changePatron={changePatron}
              patron={patron}
              requiredFields={["email"]}
            />
            <PincodeSection required changePincode={setPin} />
            <BranchesDropdown
              classNames="dropdown--grey-borders"
              selected={patron?.preferredPickupBranch || ""}
              onChange={(newPreferredPickupBranch) =>
                changePatron(newPreferredPickupBranch, "preferredPickupBranch")
              }
              required
              footnote={t("createPatronBranchDropdownNoteText")}
            />
            <div className="create-patron-page__buttons">
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
        </div>
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
