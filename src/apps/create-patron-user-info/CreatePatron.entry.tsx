import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import CreatePatron from "./CreatePatron";

interface CreatePatronConfigProps {
  pincodeLengthConfig: string;
}
interface CreatePatronUrlProps {
  privacyPolicyUrl: string;
  regulationsUrl: string;
  feesUrl: string;
}

interface CreatePatronTextProps {
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
    CreatePatronUrlProps,
    CreatePatronTextProps {}

const CreatePatronEntry: FC<CreatePatronProps> = () => <CreatePatron />;

export default withConfig(withText(withUrls(CreatePatronEntry)));
