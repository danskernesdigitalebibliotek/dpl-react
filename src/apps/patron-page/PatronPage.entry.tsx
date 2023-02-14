import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import PatronPage from "./PatronPage";

interface PatronPageConfigProps {
  blacklistedPickupBranchesConfig: string;
  branchesConfig: string;
  pincodeLengthMinConfig: string;
  pincodeLengthMaxConfig: string;
  pauseReservationStartDateConfig: string;
  blacklistedAvailabilityBranchesConfig: string;
  textNotificationsEnabledConfig: string;
}

export interface PatronPageUrlProps {
  deletePatronUrl: string;
  pauseReservationInfoUrl: string;
  fbsBaseUrl: string;
  publizonBaseUrl: string;
  dplCmsBaseUrl: string;
  coverBaseUrl: string;
  materialBaseUrl: string;
  fbiBaseUrl: string;
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
  patronPageTextFeeText: string;
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
}

export interface PatronPageProps
  extends PatronPageConfigProps,
    PatronPageTextProps,
    PatronPageUrlProps {}

const PatronPageEntry: FC<PatronPageProps> = () => <PatronPage />;

export default withConfig(withUrls(withText(PatronPageEntry)));
