import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import CreatePatron from "./CreatePatron";

interface CreatePatronConfigProps {
  thresholdUserAgeConfig: string;
  pincodeLengthMinConfig: string;
  pincodeLengthMaxConfig: string;
}

interface CreatePatronTextProps {
  blacklistedPickupBranchesConfig?: string;
  branchesConfig: string;
  userToken: string;
  fbsBaseUrl: string;
  publizonBaseUrl: string;
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
}

export interface CreatePatronProps
  extends CreatePatronConfigProps,
    CreatePatronTextProps {
  userToken: string;
}

const CreatePatronEntry: FC<CreatePatronProps> = ({ userToken }) => {
  return <CreatePatron userToken={userToken} />;
};

export default withConfig(withText(withUrls(CreatePatronEntry)));
