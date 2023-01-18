import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import PatronPage from "./PatronPage";
import { BlockedPatronEntryTextProps } from "../../core/storybook/blockedArgs";
import isPatronBlockedHoc from "../../components/blocked-patron/isPatronBlockedHoc";

interface PatronPageConfigProps {
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
  patronPageContactInfoHeaderText: string;
  patronPageContactInfoBodyText: string;
  patronPageContactPhoneLabelText: string;
  patronPageContactPhoneCheckboxText: string;
  patronPageContactEmailLabelText: string;
  patronPageContactEmailCheckboxText: string;
  patronPageStatusSectionHeaderText: string;
  patronPageStatusSectionBodyText: string;
  patronPageStatusSectionLinkText: string;
  patronPageStatusSectionLoansEbooksText: string;
  patronPageStatusSectionLoansAudioBooksText: string;
  patronPageChangePickupHeaderText: string;
  patronPageChangePickupBodyText: string;
  pickupBranchesDropdownLabelText: string;
  pickupBranchesDropdownNothingSelectedText: string;
  patronPagePauseReservationsHeaderText: string;
  patronPagePauseReservationsBodyText: string;
  patronPageSaveButtonText: string;
  patronPageDeleteProfileText: string;
  patronPagePincodesNotTheSameText: string;
  patronPageOpenPauseReservationsSectionText: string;
  patronPageOpenPauseReservationsSectionAriaText: string;
  dateInputsEndDateLabelText: string;
  dateInputsStartDateLabelText: string;
  patronPageChangePincodeHeaderText: string;
  patronPageChangePincodeBodyText: string;
  patronPagePincodeLabelText: string;
  patronPageConfirmPincodeLabelText: string;
  patronPageStatusSectionLoanHeaderText: string;
  patronPageDeleteProfileLinkText: string;
  patronPageStatusSectionReservationsText: string;
}

export interface PatronPageProps
  extends PatronPageConfigProps,
    BlockedPatronEntryTextProps,
    PatronPageTextProps {}

const PatronPageEntry: FC<PatronPageProps> = () => <PatronPage />;

export default isPatronBlockedHoc(
  withConfig(withUrls(withText(PatronPageEntry)))
);
