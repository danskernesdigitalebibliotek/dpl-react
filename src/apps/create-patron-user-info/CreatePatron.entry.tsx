import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import CreatePatron from "./CreatePatron";
import { getToken, hasToken } from "../../core/token";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";

interface CreatePatronConfigProps {
  agencyConfig: string;
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
  dashboardUrl: string;
}

interface CreatePatronTextProps {
  pickupBranchesDropdownLabelText: string;
  createPatronCancelButtonText: string;
  createPatronChangePickupBodyText: string;
  createPatronChangePickupHeaderText: string;
  createPatronConfirmButtonText: string;
  createPatronHeaderText: string;
  createPatronInvalidSSNBodyText: string;
  createPatronInvalidSSNHeaderText: string;
  patronContactEmailCheckboxText: string;
  patronContactEmailLabelText: string;
  patronContactInfoHeaderText: string;
  patronContactNameLabelText: string;
  patronContactPhoneCheckboxText: string;
  patronContactPhoneLabelText: string;
  patronPageChangePincodeBodyText: string;
  patronPageChangePincodeHeaderText: string;
  patronPageConfirmPincodeLabelText: string;
  patronPagePincodeLabelText: string;
  patronPagePincodesNotTheSameText: string;
  patronPagePincodeTooShortValidationText: string;
  phoneInputMessageText: string;
  pickupBranchesDropdownNothingSelectedText: string;
}

export interface CreatePatronProps
  extends CreatePatronConfigProps,
    GlobalEntryTextProps,
    CreatePatronUrlProps,
    CreatePatronTextProps {}

const CreatePatronEntry: FC<CreatePatronProps> = () => {
  const userToken = hasToken("user") ? getToken("user") : null;

  // The application using this app should handle the case where the user is not logged in.
  // Eg by returning 403 Forbidden or redirecting to the login page.
  if (!userToken) {
    return null;
  }

  return <CreatePatron />;
};

export default withConfig(withText(withUrls(CreatePatronEntry)));
