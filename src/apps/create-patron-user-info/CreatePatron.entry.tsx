import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import CreatePatron from "./CreatePatron";

interface CreatePatronConfigProps {
  pincodeLengthMinConfig: string;
  pincodeLengthMaxConfig: string;
  blacklistedPickupBranchesConfig: string;
  branchesConfig: string;
  textNotificationsEnabledConfig: string;
}
interface CreatePatronUrlProps {
  loginUrl: string;
  redirectOnUserCreatedUrl: string;
  fbsBaseUrl: string;
  publizonBaseUrl: string;
}

interface CreatePatronTextProps {
  pickupBranchesDropdownLabelText: string;
  patronPageChangePincodeHeaderText: string;
  pickupBranchesDropdownNothingSelectedText: string;
  patronPageChangePincodeBodyText: string;
  patronPagePincodeLabelText: string;
  patronPageConfirmPincodeLabelText: string;
  patronPagePincodeTooShortValidationText: string;
  patronPagePincodesNotTheSameText: string;
  patronContactPhoneLabelText: string;
  patronContactNameLabelText: string;
  patronContactInfoBodyText: string;
  patronContactInfoHeaderText: string;
  patronContactPhoneCheckboxText: string;
  createPatronConfirmButtonText: string;
  createPatronCancelButtonText: string;
  patronContactEmailLabelText: string;
  patronContactEmailCheckboxText: string;
  createPatronChangePickupHeaderText: string;
  createPatronChangePickupBodyText: string;
  createPatronHeaderText: string;
  createPatronInvalidSSNHeaderText: string;
  createPatronInvalidSSNBodyText: string;
}

export interface CreatePatronProps
  extends CreatePatronConfigProps,
    CreatePatronUrlProps,
    CreatePatronTextProps {
  userToken?: string;
}

const CreatePatronEntry: FC<CreatePatronProps> = ({ userToken }) => {
  if (!userToken) {
    return (
      <>
        <h2>Please Log ind..</h2>
        <p>
          When the flash message/info bar has been implemented, we will use it
          here to tell the user to log in.
        </p>
      </>
    );
  }
  return <CreatePatron userToken={userToken} />;
};

export default withConfig(withText(withUrls(CreatePatronEntry)));
