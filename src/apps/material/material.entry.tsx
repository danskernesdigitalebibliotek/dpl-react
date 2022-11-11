import * as React from "react";
import GuardedApp from "../../components/guarded-app";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import { withUrls } from "../../core/utils/url";
import Material from "./material";

interface MaterialEntryTextProps {
  alreadyReservedText: string;
  approveReservationText: string;
  audienceText: string;
  cantReserveText: string;
  cantViewReviewText: string;
  chooseOneText: string;
  closeText: string;
  contributorsText: string;
  creatorsAreMissingText: string;
  daysText: string;
  descriptionHeadlineText: string;
  detailsOfTheMaterialText: string;
  detailsText: string;
  editionsText: string;
  editionText: string;
  etAlText: string;
  fictionNonfictionText: string;
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
  genreAndFormText: string;
  getOnlineText: string;
  goToEReolenText: string;
  goToText: string;
  haveNoInterestAfterText: string;
  identifierText: string;
  infomediaModalCloseModalAriaLabelText: string;
  infomediaModalScreenReaderModalDescriptionText: string;
  inSameSeriesText: string;
  inSeriesText: string;
  isbnText: string;
  languageText: string;
  librariesHaveTheMaterialText: string;
  loadingText: string;
  loginToSeeReviewText: string;
  materialHeaderAllEditionsText: string;
  materialHeaderAuthorByText: string;
  materialIsIncludedText: string;
  materialIsLoanedOutText: string;
  materialReservationInfoText: string;
  missingDataText: string;
  materialsInStockInfoText: string;
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
  originalTitleText: string;
  outOfText: string;
  periodicalSelectEditionText: string;
  periodicalSelectYearText: string;
  pickupLocationText: string;
  publisherText: string;
  queueText: string;
  ratingIsText: string;
  readArticleText: string;
  receiveEmailWhenMaterialReadyText: string;
  receiveSmsWhenMaterialReadyText: string;
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
  scopeText: string;
  seeOnlineText: string;
  shiftText: string;
  sixMonthsText: string;
  threeMonthsText: string;
  tryAginButtonText: string;
  twoMonthsText: string;
  typeText: string;
}
interface MaterialEntryUrlProps {
  dplCmsBaseUrl: string;
  materialUrl: string;
  searchUrl: string;
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
