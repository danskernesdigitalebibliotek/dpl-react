import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import UserPage from "./UserPage";

interface UserPageConfigProps {
  fbsBaseUrlConfig: string;
  publizonBaseUrlConfig: string;
  blacklistedPickupBranchesConfig?: string;
  branchesConfig: string;
  pincodeLengthConfig: number;
}
interface UserPageTextProps {
  userPageHeaderText: string;
  userPageBasicDetailsHeaderText: string;
  userPageBasicDetailsNameLabelText: string;
  userPageBasicDetailsAddressLabelText: string;
  userPageContactInfoHeaderText: string;
  userPageContactInfoBreadText: string;
  userPageContactPhoneLabelText: string;
  userPageContactPhoneCheckboxText: string;
  userPageContactEmailLabelText: string;
  userPageContactEmailCheckboxText: string;
  userPageStatusBarHeaderText: string;
  userPageStatusBarBreadText: string;
  userPageStatusBarLinkText: string;
  userPageStatusBarLoansEbooksText: string;
  userPageStatusBarLoansAudioBooksText: string;
  userPageStatusBarReservationsEbooksText: string;
  userPageStatusBarReservationsAudioBooksText: string;
  userPageChangePickupHeaderText: string;
  userPageChangePickupBreadText: string;
  pickupBranchesDropdownLabelText: string;
  pickupBranchesDropdownNothingSelectedText: string;
  userPagePauseReservationsHeaderText: string;
  userPagePauseReservationsBreadText: string;
  userPageOpenPauseReservationsSectionText: string;
  userPageOpenPauseReservationsSectionAriaText: string;
  pauseReservationEndDateLabelText: string;
  pauseReservationStartDateLabelText: string;
  userPageChangePincodeHeaderText: string;
  userPageChangePincodeBreadText: string;
  userPagePincodeLabelText: string;
  userPageConfirmPincodeLabelText: string;
}

export interface UserPageProps extends UserPageConfigProps, UserPageTextProps {}

const LoanListEntry: FC<UserPageProps> = () => <UserPage />;

export default withConfig(withText(LoanListEntry));
