import React, { FC, useState, useRef, FormEvent } from "react";
import { set } from "lodash";
import BranchesDropdown from "../patron-page/util/BranchesDropdown";
import { PatronSettingsV4 } from "../../core/fbs/model";
import { useText } from "../../core/utils/text";
import { useCreateV9 } from "../../core/fbs/fbs";
import { patronAgeValid } from "../../core/utils/helpers/general";
import { useConfig } from "../../core/utils/config";
import { useUrls } from "../../core/utils/url";
import Link from "../../components/atoms/links/Link";
import { getSubmitButtonText } from "./helper";
import { convertPatronSettingsV4toV6 } from "../../core/utils/useSavePatron";
import ContactInfoPhone from "../../components/contact-info-section/ContactInfoPhone";
import ContactInfoEmail from "../../components/contact-info-section/ContactInfoEmail";
import CheckBox from "../../components/checkbox/Checkbox";
import PincodePatronSection from "./CreatePatronPincodeSection";
import LibrarySelect from "./LibrarySelect";
import FindLibraryDialog from "./FindLibraryDialog";
import useDialog from "../../components/dialog/useDialog";
import Dialog from "../../components/dialog/Dialog";
import { useGetBranches } from "../../core/utils/branches";

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
  const { dialogContent, openDialogWithContent, closeDialog, dialogRef } =
    useDialog();
  const branches = useGetBranches("blacklistedPickupBranchesConfig");

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
            patron: convertPatronSettingsV4toV6(patron),
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

  const handleBranchSelect = (branchId: string) => {
    changePatron(branchId, "preferredPickupBranch");
    closeDialog();
  };

  const selectedBranch = branches?.find(
    (b) => b.branchId === patron.preferredPickupBranch
  );

  return (
    <>
      {validCpr && (
        <div className="create-patron-page">
          <h1 className="create-patron-page__title">
            {t("createPatronHeaderText")}
          </h1>
          <form
            className="create-patron-page__form"
            onSubmit={(e) => handleSubmit(e)}
            ref={formRef}
          >
            <section
              data-cy="patron-page-contact-info"
              className="create-patron-page__row dpl-input__double-row"
            >
              <div className="dpl-input__double-row">
                <div className="dpl-input dpl-input--double">
                  <ContactInfoPhone
                    className="dpl-input"
                    changePatron={changePatron}
                    patron={patron}
                    isRequired={true}
                    showCheckboxes={false}
                  />
                  <div className="mt-8">
                    <CheckBox
                      onChecked={(newReceiveSms: boolean) =>
                        changePatron(newReceiveSms, "receiveSms")
                      }
                      id="phone-messages"
                      selected={patron?.receiveSms}
                      disabled={false}
                      label={t("patronContactPhoneCheckboxText")}
                    />
                  </div>
                </div>
                <ContactInfoEmail
                  className="dpl-input dpl-input--double"
                  changePatron={changePatron}
                  patron={patron}
                  isRequired={true}
                  showCheckboxes={false}
                />
              </div>
            </section>

            <PincodePatronSection
              required
              changePincode={setPin}
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

            <section className="create-patron-page__row">
              <LibrarySelect
                label="Choose library*"
                id="library-select"
                description="Select the library you want to borrow from."
                validation="Please select a library*"
                selectedBranch={selectedBranch}
                required
                onClickCallback={() =>
                  openDialogWithContent(
                    <FindLibraryDialog
                      handleBranchSelect={handleBranchSelect}
                      selectedBranchId={patron.preferredPickupBranch}
                      branches={branches}
                    />
                  )
                }
              />

              <Dialog isSidebar closeDialog={closeDialog} ref={dialogRef}>
                {dialogContent}
              </Dialog>
            </section>

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
