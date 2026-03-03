import React, { FC, useEffect } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { useUrls, withUrls } from "../../core/utils/url";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { DataforsyningenArgs } from "../../core/storybook/dataforsyningenArgs";
import { BranchAddressSearchArgs } from "../../core/storybook/branchAddressSearchArgs";
import { isUnregistered } from "../../core/utils/helpers/user";
import { redirectTo } from "../../core/utils/helpers/url";
import CreatePatron from "./CreatePatron";

interface CreatePatronConfigProps {
  agencyConfig: string;
  pincodeLengthMinConfig: string;
  pincodeLengthMaxConfig: string;
  blacklistedPickupBranchesConfig: string;
  branchesConfig: string;
  textNotificationsEnabledConfig: string;
}
interface CreatePatronUrlProps {
  authUrl: string;
  loginUrl: string;
  redirectOnUserCreatedUrl: string;
  logoutUrl: string;
  fbsBaseUrl: string;
  publizonBaseUrl: string;
  dashboardUrl: string;
  userinfoUrl: string;
}

interface CreatePatronTextProps {
  pickupBranchesDropdownLabelText: string;
  createPatronCancelButtonText: string;
  patronPagePhoneInputMessageText: string;
  createPatronConfirmButtonText: string;
  createPatronHeaderText: string;
  createPatronInvalidSsnBodyText: string;
  createPatronInvalidSsnHeaderText: string;
  patronContactEmailCheckboxText: string;
  patronContactEmailLabelText: string;
  patronContactNameLabelText: string;
  patronContactPhoneCheckboxText: string;
  patronContactPhoneLabelText: string;
  patronPageChangePincodeHeaderText: string;
  patronPageConfirmPincodeLabelText: string;
  patronPagePincodeLabelText: string;
  patronPagePincodesNotTheSameText: string;
  patronPagePincodeTooShortValidationText: string;
  phoneInputMessageText: string;
  pickupBranchesDropdownNothingSelectedText: string;
  createPatronButtonLoadingText: string;
  createPatronButtonErrorText: string;
  createPatronBranchDropdownNoteText: string;
  postRegisterRedirectInfoTopText: string;
  postRegisterRedirectInfoBottomText: string;
  postRegisterRedirectButtonText: string;

  librarySelectEmptyStateText: string;
  findLibraryDialogTitleText: string;
  findLibraryDialogSuggestionsListLabelText: string;

  geoLocationErrorNotSupportedText: string;
  geoLocationErrorPermissionDeniedText: string;
  geoLocationErrorPositionUnavailableText: string;
  geoLocationErrorTimeoutText: string;
  geoLocationErrorDefaultText: string;

  reverseGeocodeErrorDefaultText: string;
}

export interface CreatePatronProps
  extends CreatePatronConfigProps,
    GlobalEntryTextProps,
    DataforsyningenArgs,
    BranchAddressSearchArgs,
    CreatePatronUrlProps,
    CreatePatronTextProps {
  fakeCpr?: string;
  minAgeConfig?: string;
}

const CreatePatronEntry: FC<CreatePatronProps> = ({ fakeCpr }) => {
  const u = useUrls();
  const dashboardUrl = u("dashboardUrl");

  // TODO: Investigate wether we need to wrap the redirect in a useEffect.
  useEffect(() => {
    // If the user has already been registered, redirect to the dashboard.
    if (!isUnregistered()) {
      redirectTo(dashboardUrl);
    }
  }, [dashboardUrl]);

  return isUnregistered() ? <CreatePatron cpr={fakeCpr} /> : null;
};

export default withConfig(withText(withUrls(CreatePatronEntry)));
