import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import PatronPage from "./PatronPage";
import { BlockedPatronEntryTextProps } from "../../core/storybook/blockedArgs";
import withIsPatronBlockedHoc from "../../core/utils/withIsPatronBlockedHoc";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";

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
}

interface PatronPageTextProps {
  patronContactEmailCheckboxText: string;
  patronContactEmailLabelText: string;
  patronContactInfoHeaderText: string;
  patronContactPhoneCheckboxText: string;
  patronContactPhoneLabelText: string;
  patronPageBasicDetailsAddressLabelText: string;
  patronPageBasicDetailsHeaderText: string;
  patronPageBasicDetailsNameLabelText: string;
  patronPageChangePickupBodyText: string;
  patronPageChangePickupHeaderText: string;
  patronPageChangePincodeBodyText: string;
  patronPageChangePincodeHeaderText: string;
  patronPageConfirmPincodeLabelText: string;
  patronPageDeleteProfileLinkText: string;
  patronPageDeleteProfileText: string;
  patronPageHandleResponseInformationText: string;
  patronPageHeaderText: string;
  patronPageLoadingText: string;
  patronPageOpenPauseReservationsSectionAriaText: string;
  patronPageOpenPauseReservationsSectionText: string;
  patronPagePauseReservationsBodyText: string;
  patronPagePauseReservationsHeaderText: string;
  patronPagePhoneInputMessageText: string;
  patronPagePincodeLabelText: string;
  patronPagePincodesNotTheSameText: string;
  patronPagePincodeTooShortValidationText: string;
  patronPageSaveButtonText: string;
  patronPageStatusSectionBodyText: string;
  patronPageStatusSectionHeaderText: string;
  patronPageStatusSectionLoanHeaderText: string;
  patronPageStatusSectionLoansAudioBooksText: string;
  patronPageStatusSectionLoansEbooksText: string;
  patronPageStatusSectionOutOfAriaLabelAudioBooksText: string;
  patronPageStatusSectionOutOfAriaLabelEbooksText: string;
  patronPageStatusSectionOutOfText: string;
  patronPageStatusSectionReservationsText: string;
  patronPinSavedSuccessText: string;
  pauseReservationModalBodyText: string;
  pauseReservationModalCancelButtonLabelText: string;
  pauseReservationModalCloseModalText: string;
  pauseReservationModalDateRangeLabelText: string;
  pauseReservationModalDateRangePlaceholderText: string;
  pauseReservationModalHeaderText: string;
  pauseReservationModalLinkText: string;
  pauseReservationModalSaveButtonLabelText: string;
  pickupBranchesDropdownLabelText: string;
  pickupBranchesDropdownNothingSelectedText: string;
  userinfoUrl: string;
}

export interface PatronPageProps
  extends PatronPageConfigProps,
    BlockedPatronEntryTextProps,
    PatronPageTextProps,
    PatronPageUrlProps,
    GlobalEntryTextProps,
    GlobalUrlEntryPropsInterface {}

const PatronPageEntry: FC<PatronPageProps> = () => <PatronPage />;

export default withConfig(
  withUrls(withText(withIsPatronBlockedHoc(PatronPageEntry)))
);
