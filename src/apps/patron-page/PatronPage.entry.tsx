import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import PatronPage from "./PatronPage";

interface PatronPageConfigProps {
  blacklistedPickupBranchesConfig?: string;
  branchesConfig: string;
  pincodeLengthConfig: string;
  deletePatronLinkConfig: string;
  alwaysLoanableEreolenLink: string;
  pauseReservationStartDateConfig: string;
}

export interface PatronPageUrlProps {
  fbsBaseUrl: string;
  publizonBaseUrl: string;
  dplCmsBaseUrl: string;
  coverBaseUrl: string;
  materialBaseUrl: string;
  fbiBaseUrl: string;
  thresholdConfig: string;
  textNotificationsEnabledConfig: string;
}

interface PatronPageTextProps {
  pauseReservationModalCloseModalText: string;
  dateInputsStartDateLabelText: string;
  dateInputsEndDateLabelText: string;
  pauseReservationModalBelowInputsTextText: string;
  pauseReservationModalLinkText: string;
  pauseReservationModalSaveButtonLabelText: string;
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
  patronPageChangePincodeHeaderText: string;
  patronPageChangePincodeBodyText: string;
  patronPagePincodeLabelText: string;
  patronPageConfirmPincodeLabelText: string;
  patronPageStatusSectionLoanHeaderText: string;
  patronPageDeleteProfileLinkText: string;
  patronPageStatusSectionReservationsText: string;
  patronPageTextFeeText: string;
}

export interface PatronPageProps
  extends PatronPageConfigProps,
    PatronPageTextProps,
    PatronPageUrlProps {}

const PatronPageEntry: FC<PatronPageProps> = () => <PatronPage />;

export default withConfig(withUrls(withText(PatronPageEntry)));
