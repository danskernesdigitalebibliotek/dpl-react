import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import CreatePatron from "./CreatePatron";

interface CreatePatronConfigProps {
  pincodeLengthConfig: string;
}

interface CreatePatronTextProps {
  blacklistedPickupBranchesConfig?: string;
  branchesConfig: string;
  fbsBaseUrl: string;
  publizonBaseUrl: string;
  pickupBranchesDropdownLabelText: string;
  patronPageChangePincodeHeaderText: string;
  pickupBranchesDropdownNothingSelectedText: string;
  patronPageChangePincodeBreadText: string;
  patronPagePincodeLabelText: string;
  patronPageConfirmPincodeLabelText: string;
  patronPagePincodeTooShortValidationText: string;
  patronPagePincodesNotTheSameText: string;
  patronContactPhoneLabelText: string;
  patronContactInfoBreadText: string;
  patronContactInfoHeaderText: string;
  patronContactPhoneCheckboxText: string;
  patronContactEmailLabelText: string;
  patronContactEmailCheckboxText: string;
  createPatronChangePickupHeaderText: string;
  createPatronChangePickupBreadText: string;
}

export interface CreatePatronProps
  extends CreatePatronConfigProps,
    CreatePatronTextProps {}

const CreatePatronEntry: FC<CreatePatronProps> = () => <CreatePatron />;

export default withConfig(withText(withUrls(CreatePatronEntry)));
