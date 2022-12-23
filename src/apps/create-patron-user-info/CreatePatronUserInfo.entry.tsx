import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import CreatePatronUserInfo from "./CreatePatronUserInfo";

interface CreatePatronUserInfoConfigProps {
  pincodeLengthConfig: string;
}

interface CreatePatronUserInfoTextProps {
  blacklistedPickupBranchesConfig?: string;
  branchesConfig: string;
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
  patronContactInfoBodyText: string;
  patronContactInfoHeaderText: string;
  patronContactPhoneCheckboxText: string;
  createPatronUserInfoConfirmButtonText: string;
  createPatronUserInfoCancelButtonText: string;
  patronContactEmailLabelText: string;
  patronContactEmailCheckboxText: string;
  createPatronUserInfoChangePickupHeaderText: string;
  createPatronUserInfoChangePickupBodyText: string;
  createPatronUserInfoHeaderText: string;
}

export interface CreatePatronUserInfoProps
  extends CreatePatronUserInfoConfigProps,
    CreatePatronUserInfoTextProps {}

const CreatePatronUserInfoEntry: FC<CreatePatronUserInfoProps> = () => (
  <CreatePatronUserInfo />
);

export default withConfig(withText(withUrls(CreatePatronUserInfoEntry)));
