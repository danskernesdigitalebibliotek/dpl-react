import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import PatronPage from "./PatronPage";
import { BlockedPatronEntryTextProps } from "../../core/storybook/blockedArgs";
import withIsPatronBlockedHoc from "../../core/utils/withIsPatronBlockedHoc";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";

interface PatronPageConfigProps {
  blacklistedPickupBranchesConfig: string;
  branchesConfig: string;
  pincodeLengthMinConfig: string;
  pincodeLengthMaxConfig: string;
  pauseReservationStartDateConfig: string;
  textNotificationsEnabledConfig: string;
  minAgeConfig: string;
}

export interface PatronPageUrlProps {
  deletePatronUrl: string;
  pauseReservationInfoUrl: string;
  alwaysLoanableEreolenUrl: string;
}

interface PatronPageTextProps {
  patronPageHeaderText: string;
  pauseReservationModalHeaderText: string;
  pauseReservationModalBodyText: string;
  pauseReservationModalCloseModalText: string;
  patronPinSavedSuccessText: string;
  dateInputsStartDateLabelText: string;
  dateInputsEndDateLabelText: string;
  pauseReservationModalBelowInputsTextText: string;
  pauseReservationModalLinkText: string;
  pauseReservationModalSaveButtonLabelText: string;
  patronPageBasicDetailsHeaderText: string;
  patronPageBasicDetailsNameLabelText: string;
  patronPageBasicDetailsAddressLabelText: string;
  patronContactInfoHeaderText: string;
  patronContactInfoBodyText: string;
  patronContactPhoneLabelText: string;
  patronContactPhoneCheckboxText: string;
  patronContactEmailLabelText: string;
  patronContactEmailCheckboxText: string;
  patronPageStatusSectionHeaderText: string;
  patronPageStatusSectionBodyText: string;
  patronPageStatusSectionLinkText: string;
  patronPageStatusSectionLoanHeaderText: string;
  patronPageStatusSectionLoansEbooksText: string;
  patronPageStatusSectionLoansAudioBooksText: string;
  patronPageChangePickupHeaderText: string;
  patronPageChangePickupBodyText: string;
  pickupBranchesDropdownLabelText: string;
  pickupBranchesDropdownNothingSelectedText: string;
  patronPagePauseReservationsHeaderText: string;
  patronPagePauseReservationsBodyText: string;
  patronPageOpenPauseReservationsSectionText: string;
  patronPageOpenPauseReservationsSectionAriaText: string;
  patronPageChangePincodeHeaderText: string;
  patronPageChangePincodeBodyText: string;
  patronPagePincodeLabelText: string;
  patronPageConfirmPincodeLabelText: string;
  patronPagePincodeTooShortValidationText: string;
  patronPagePincodesNotTheSameText: string;
  patronPageSaveButtonText: string;
  patronPageDeleteProfileText: string;
  patronPageDeleteProfileLinkText: string;
  patronPageStatusSectionReservationsText: string;
  patronPageStatusSectionOutOfText: string;
  patronPageStatusSectionOutOfAriaLabelAudioBooksText: string;
  patronPageStatusSectionOutOfAriaLabelEbooksText: string;
  phoneInputMessageText: string;
}

export interface PatronPageProps
  extends PatronPageConfigProps,
    BlockedPatronEntryTextProps,
    PatronPageTextProps,
    PatronPageUrlProps,
    GlobalUrlEntryPropsInterface {}

const PatronPageEntry: FC<PatronPageProps> = () => <PatronPage />;

export default withConfig(
  withUrls(withText(withIsPatronBlockedHoc(PatronPageEntry)))
);
