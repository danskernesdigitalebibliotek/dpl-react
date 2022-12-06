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
  alwaysLoanableEreolenLink: string;
}
interface PatronPageTextProps {
  patronPageHeaderText: string;
  patronPagePincodeTooShortValidationText: string;
  patronPageBasicDetailsHeaderText: string;
  patronPageBasicDetailsNameLabelText: string;
  patronPageBasicDetailsAddressLabelText: string;
  patronContactInfoHeaderText: string;
  patronContactInfoBreadText: string;
  patronContactPhoneLabelText: string;
  patronContactPhoneCheckboxText: string;
  patronContactEmailLabelText: string;
  patronContactEmailCheckboxText: string;
  patronPageStatusSectionHeaderText: string;
  patronPageStatusSectionBreadText: string;
  patronPageStatusSectionLinkText: string;
  patronPageStatusSectionLoansEbooksText: string;
  patronPageStatusSectionLoansAudioBooksText: string;
  patronPageChangePickupHeaderText: string;
  patronPageChangePickupBreadText: string;
  pickupBranchesDropdownLabelText: string;
  pickupBranchesDropdownNothingSelectedText: string;
  patronPagePauseReservationsHeaderText: string;
  patronPagePauseReservationsBreadText: string;
  patronPageSaveButtonText: string;
  patronPageDeleteProfileText: string;
  patronPagePincodesNotTheSameText: string;
  patronPageOpenPauseReservationsSectionText: string;
  patronPageOpenPauseReservationsSectionAriaText: string;
  dateInputsEndDateLabelText: string;
  dateInputsStartDateLabelText: string;
  patronPageChangePincodeHeaderText: string;
  patronPageChangePincodeBreadText: string;
  patronPagePincodeLabelText: string;
  patronPageConfirmPincodeLabelText: string;
  patronPageStatusSectionLoanHeaderText: string;
  patronPageDeleteProfileLinkText: string;
  patronPageStatusSectionReservationsText: string;
}

export interface PatronPageProps
  extends PatronPageConfigProps,
    PatronPageTextProps {}

const PatronPageEntry: FC<PatronPageProps> = () => <PatronPage />;

export default withConfig(withText(PatronPageEntry));
