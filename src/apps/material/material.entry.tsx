import * as React from "react";
import GuardedApp from "../../components/guarded-app";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import { withUrls } from "../../core/utils/url";
import Material from "./material";

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
  closeText: string;
  daysText: string;
  descriptionHeadlineText: string;
  detailsListAudienceText: string;
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
  findOnShelfTableDescriptionText: string;
  findOnShelfModalListFindOnShelfText: string;
  findOnShelfModalListItemCountText: string;
  findOnShelfModalListMaterialText: string;
  findOnShelfModalNoLocationSpecifiedText: string;
  findOnShelfModalPeriodicalEditionDropdownText: string;
  findOnShelfModalPeriodicalYearDropdownText: string;
  findOnShelfModalScreenReaderModalDescriptionText: string;
  firstAvailableEditionText: string;
  getOnlineText: string;
  goToText: string;
  haveNoInterestAfterText: string;
  identifierText: string;
  infomediaModalCloseModalAriaLabelText: string;
  infomediaModalScreenReaderModalDescriptionText: string;
  inSameSeriesText: string;
  inSeriesText: string;
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
  modalReservationFormPickupHeaderDescriptionText: string;
  modalReservationFormPickupHeaderTitleText: string;
  modalReservationFormSmsHeaderDescriptionText: string;
  modalReservationFormSmsHeaderTitleText: string;
  modalReservationFormSmsInputFieldDescriptionText: string;
  modalReservationFormSmsInputFieldLabelText: string;
  numberDescriptionText: string;
  numberInQueueText: string;
  okButtonText: string;
  oneMonthText: string;
  oneYearText: string;
  onlineLimitMonthInfoText: string;
  orderDigitalCopyButtonLoadingText: string;
  orderDigitalCopyButtonText: string;
  orderDigitalCopyDescriptionText: string;
  orderDigitalCopyEmailLabelText: string;
  orderDigitalCopyModalCloseModalAriaLabelText: string;
  orderDigitalCopyModalScreenReaderModalDescriptionText: string;
  orderDigitalCopyFeedbackButtonText: string;
  orderDigitalCopyFeedbackOkText: string;
  orderDigitalCopyFeedbackErrorAgencyNotSubscribedText: string;
  orderDigitalCopyFeedbackErrorInvalidPickupBranchText: string;
  orderDigitalCopyFeedbackErrorMissingClientConfigurationText: string;
  orderDigitalCopyFeedbackErrorPidNotReservableText: string;
  orderDigitalCopyFeedbackErrorUnauthenticatedUserText: string;
  orderDigitalCopyFeedbackTitleText: string;
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
  seeOnlineText: string;
  shiftText: string;
  sixMonthsText: string;
  threeMonthsText: string;
  tryAginButtonText: string;
  twoMonthsText: string;
}
interface MaterialEntryUrlProps {
  dplCmsBaseUrl: string;
  materialUrl: string;
  searchUrl: string;
  authUrl: string;
}
interface MaterialEntryConfigProps {
  smsNotificationsForReservationsEnabledConfig: boolean;
  blacklistedPickupBranchesConfig?: string;
  blacklistedAvailabilityBranchesConfig?: string;
  branchesConfig: string;
}

export interface MaterialEntryProps
  extends MaterialEntryUrlProps,
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
