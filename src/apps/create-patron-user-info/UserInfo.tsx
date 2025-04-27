import React, { FC, useState, useRef, FormEvent } from "react";
import { set } from "lodash";
import PincodeSection from "../patron-page/sections/PincodeSection";
import BranchesDropdown from "../patron-page/util/BranchesDropdown";
import { PatronSettingsV4 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
import ContactInfoSection from "../../components/contact-info-section/ContactInfoSection";
import { useCreateV9 } from "../../core/fbs/fbs";
import { patronAgeValid } from "../../core/utils/helpers/general";
import { useConfig } from "../../core/utils/config";
import { useUrls } from "../../core/utils/url";
import Link from "../../components/atoms/links/Link";
import { getSubmitButtonText } from "./helper";
import { convertPatronSettingsV4toV6 } from "../../core/utils/useSavePatron";

export interface UserInfoProps {
  cpr: string;
  registerSuccessCallback: (success: boolean) => void;
}

const UserInfo: FC<UserInfoProps> = ({ cpr, registerSuccessCallback }) => {
  const t = useText();
  const u = useUrls();
  const logoutUrl = u("logoutUrl");
  const config = useConfig();
  const formRef = useRef<HTMLFormElement>(null);
  const [pin, setPin] = useState<string | null>(null);
  const minAge = parseInt(config("minAgeConfig"), 10);
  const [validCpr] = useState<boolean>(patronAgeValid(cpr, minAge));
  const { mutate } = useCreateV9();
  const [patron, setPatron] = useState<PatronSettingsV4>({
    preferredPickupBranch: "",
    receiveEmail: true,
    receivePostalMail: false,
    receiveSms: false,
    phoneNumber: "",
    emailAddress: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitError, setIsSubmitError] = useState<boolean>(false);
  const [isPinValid, setIsPinValid] = useState<boolean>(true);

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
          data: {
            personIdentifier: cpr,
            patron: {
              ...convertPatronSettingsV4toV6(patron),
              guardianVisibility: false
            },
            pincode: pin
          }
        },
        {
          onSuccess: () => {
            setIsLoading(false);
            registerSuccessCallback(true);
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
              showCheckboxes={["phone"]}
              isDouble
              inLine
              changePatron={changePatron}
              patron={patron}
              requiredFields={["email"]}
            />
            <PincodeSection
              required
              changePincode={setPin}
              isFlex
              setIsPinValid={setIsPinValid}
            />
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
                disabled={!isPinValid}
              >
                {getSubmitButtonText(t, isLoading, isSubmitError)}
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
