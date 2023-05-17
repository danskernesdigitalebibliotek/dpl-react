import * as React from "react";
import GuardedApp from "../../components/guarded-app";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import { withUrls } from "../../core/utils/url";
import Material from "./material";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";

interface MaterialEntryTextProps {
  addToFavoritesAriaLabelText: string;
  alertErrorCloseText: string;
  alertErrorMessageText: string;
  alreadyReservedText: string;
  approveReservationText: string;
  cantReserveText: string;
  cantViewReviewText: string;
  changeEmailText: string;
  changeInterestPeriodText: string;
  changePickupLocationText: string;
  changeSmsNumberText: string;
  chooseOneText: string;
  closeModalAriaLabelEmailText: string;
  closeModalAriaLabelInterestPeriodText: string;
  closeModalAriaLabelPickupText: string;
  closeModalAriaLabelSmsText: string;
  closeText: string;
  daysText: string;
  descriptionHeadlineText: string;
  detailsListAudienceText: string;
  detailsListAuthorsText: string;
  detailsListContributorsText: string;
  detailsListEditionText: string;
  detailsListFirstEditionYearText: string;
  detailsListFirstEditionYearUnknownText: string;
  detailsListGenreAndFormText: string;
  detailsListIsbnText: string;
  detailsListLanguageText: string;
  detailsListOriginalTitleText: string;
  detailsListPlayTimeText: string;
  detailsListPublisherText: string;
  detailsListScopeText: string;
  detailsListTypeText: string;
  detailsOfTheMaterialText: string;
  detailsText: string;
  editionsText: string;
  editionText: string;
  etAlText: string;
  expandMoreText: string;
  fictionNonfictionText: string;
  filmAdaptationsText: string;
  findOnBookshelfText: string;
  findOnShelfExpandButtonExplanationText: string;
  findOnShelfModalCloseModalAriaLabelText: string;
  findOnShelfModalListFindOnShelfText: string;
  findOnShelfModalListItemCountText: string;
  findOnShelfModalListMaterialText: string;
  findOnShelfModalNoLocationSpecifiedText: string;
  findOnShelfModalPeriodicalEditionDropdownText: string;
  findOnShelfModalPeriodicalYearDropdownText: string;
  findOnShelfModalScreenReaderModalDescriptionText: string;
  findOnShelfTableDescriptionText: string;
  firstAvailableEditionText: string;
  getOnlineText: string;
  goToText: string;
  haveNoInterestAfterText: string;
  identifierText: string;
  infomediaModalCloseModalAriaLabelText: string;
  infomediaModalScreenReaderModalDescriptionText: string;
  inSameSeriesText: string;
  inSeriesText: string;
  instantLoanSubTitleText: string;
  instantLoanTitleText: string;
  instantLoanUnderlineDescriptionText: string;
  interestPeriodOneMonthConfigText: string;
  interestPeriodOneYearConfigText: string;
  interestPeriodSixMonthsConfigText: string;
  interestPeriodThreeMonthsConfigText: string;
  interestPeriodTwoMonthsConfigText: string;
  librariesHaveTheMaterialText: string;
  listenOnlineText: string;
  loadingText: string;
  loginToSeeReviewText: string;
  materialHeaderAllEditionsText: string;
  materialHeaderAuthorByText: string;
  materialIsAvailableInAnotherEditionText: string;
  materialIsIncludedText: string;
  materialIsLoanedOutText: string;
  materialReservationInfoText: string;
  materialsInStockInfoText: string;
  missingDataText: string;
  modalReservationFormEmailHeaderDescriptionText: string;
  modalReservationFormEmailHeaderTitleText: string;
  modalReservationFormEmailInputFieldDescriptionText: string;
  modalReservationFormEmailInputFieldLabelText: string;
  modalReservationFormNoInterestAfterHeaderDescriptionText: string;
  modalReservationFormNoInterestAfterHeaderTitleText: string;
  modalReservationFormNoInterestAfterLabelText: string;
  modalReservationFormPickupHeaderDescriptionText: string;
  modalReservationFormPickupHeaderTitleText: string;
  modalReservationFormPickupLabelText: string;
  modalReservationFormSmsHeaderDescriptionText: string;
  modalReservationFormSmsHeaderTitleText: string;
  modalReservationFormSmsInputFieldDescriptionText: string;
  modalReservationFormSmsInputFieldLabelText: string;
  numberDescriptionText: string;
  numberInQueueText: string;
  okButtonText: string;
  oneMonthText: string;
  oneYearText: string;
  onlineLimitMonthAudiobookInfoText: string;
  onlineLimitMonthEbookInfoText: string;
  orderDigitalCopyButtonLoadingText: string;
  orderDigitalCopyButtonText: string;
  orderDigitalCopyDescriptionText: string;
  orderDigitalCopyEmailLabelText: string;
  orderDigitalCopyFeedbackButtonText: string;
  orderDigitalCopyFeedbackErrorAgencyNotSubscribedText: string;
  orderDigitalCopyFeedbackErrorInvalidPickupBranchText: string;
  orderDigitalCopyFeedbackErrorMissingClientConfigurationText: string;
  orderDigitalCopyFeedbackErrorPidNotReservableText: string;
  orderDigitalCopyFeedbackErrorUnauthenticatedUserText: string;
  orderDigitalCopyFeedbackOkText: string;
  orderDigitalCopyFeedbackTitleText: string;
  orderDigitalCopyModalCloseModalAriaLabelText: string;
  orderDigitalCopyModalScreenReaderModalDescriptionText: string;
  orderDigitalCopyTitleText: string;
  outOfText: string;
  periodicalSelectEditionText: string;
  periodicalSelectYearText: string;
  pickupLocationText: string;
  queueText: string;
  ratingIsText: string;
  readArticleText: string;
  receiveEmailWhenMaterialReadyText: string;
  receiveSmsWhenMaterialReadyText: string;
  removeFromFavoritesAriaLabelText: string;
  reservationErrorsDescriptionText: string;
  reservationErrorsTitleText: string;
  reservationModalCloseModalAriaLabelText: string;
  reservationModalScreenReaderModalDescriptionText: string;
  reservationSuccesIsReservedForYouText: string;
  reservationSuccessPreferredPickupBranchText: string;
  reservationSuccesTitleText: string;
  reserveBookText: string;
  reserveText: string;
  reviewsText: string;
  saveButtonText: string;
  screenReaderModalDescriptionEmailText: string;
  screenReaderModalDescriptionInterestPeriodText: string;
  screenReaderModalDescriptionPickupText: string;
  screenReaderModalDescriptionSmsText: string;
  seeOnlineText: string;
  shiftText: string;
  sixMonthsText: string;
  subjectNumberText: string;
  threeMonthsText: string;
  tryAginButtonText: string;
  twoMonthsText: string;
}

interface MaterialEntryConfigProps {
  blacklistedAvailabilityBranchesConfig?: string;
  blacklistedInstantLoanBranchesConfig: string;
  blacklistedPickupBranchesConfig?: string;
  branchesConfig: string;
  instantLoanConfig: string;
  smsNotificationsForReservationsEnabledConfig: boolean;
}

export interface MaterialEntryProps
  extends GlobalUrlEntryPropsInterface,
    MaterialEntryTextProps,
    MaterialEntryConfigProps {
  wid: WorkId;
}

const WrappedMaterialEntry: React.FC<MaterialEntryProps> = ({ wid }) => (
  <GuardedApp app="material">
    <Material wid={wid} />
  </GuardedApp>
);

export default withConfig(withUrls(withText(WrappedMaterialEntry)));
