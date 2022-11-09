import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import PatronPage from "./PatronPage";

interface PatronPageConfigProps {
  fbsBaseUrlConfig: string;
  publizonBaseUrlConfig: string;
  blacklistedPickupBranchesConfig?: string;
  branchesConfig: string;
  pincodeLengthConfig: string;
  deletePatronLinkConfig: string;
}
interface PatronPageTextProps {
  patronPageHeaderText: string;
  patronPageBasicDetailsHeaderText: string;
  patronPageBasicDetailsNameLabelText: string;
  patronPageBasicDetailsAddressLabelText: string;
  patronPageContactInfoHeaderText: string;
  patronPageContactInfoBreadText: string;
  patronPageContactPhoneLabelText: string;
  patronPageContactPhoneCheckboxText: string;
  patronPageContactEmailLabelText: string;
  patronPageContactEmailCheckboxText: string;
  patronPageStatusSectionHeaderText: string;
  patronPageStatusSectionBreadText: string;
  patronPageStatusSectionLinkText: string;
  patronPageStatusSectionLoansEbooksText: string;
  patronPageStatusSectionLoansAudioBooksText: string;
  patronPageStatusSectionReservationsEbooksText: string;
  patronPageStatusSectionReservationsAudioBooksText: string;
  patronPageChangePickupHeaderText: string;
  patronPageChangePickupBreadText: string;
  pickupBranchesDropdownLabelText: string;
  pickupBranchesDropdownNothingSelectedText: string;
  patronPagePauseReservationsHeaderText: string;
  patronPagePauseReservationsBreadText: string;
  patronPageOpenPauseReservationsSectionText: string;
  patronPageOpenPauseReservationsSectionAriaText: string;
  pauseReservationEndDateLabelText: string;
  pauseReservationStartDateLabelText: string;
  patronPageChangePincodeHeaderText: string;
  patronPageChangePincodeBreadText: string;
  patronPagePincodeLabelText: string;
  patronPageConfirmPincodeLabelText: string;
  patronPageStatusSectionReservationsHeaderText: string;
  patronPageStatusSectionLoanHeaderText: string;
  patronPageDeleteProfileLinkText: string;
}

export interface PatronPageProps
  extends PatronPageConfigProps,
    PatronPageTextProps {}

const PatronPageEntry: FC<PatronPageProps> = () => <PatronPage />;

export default withConfig(withText(PatronPageEntry));
