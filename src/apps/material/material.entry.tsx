import * as React from "react";
import GuardedApp from "../../components/guarded-app";
import { withText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import { withUrls } from "../../core/utils/url";
import Material from "./material";

interface MaterialEntryTextProps {
  materialHeaderAuthorByText: string;
  periodicalSelectYearText: string;
  periodicalSelectEditionText: string;
  reserveBookText: string;
  findOnBookshelfText: string;
  descriptionHeadlineText: string;
  identifierText: string;
  inSeriesText: string;
  inSameSeriesText: string;
  numberDescriptionText: string;
  loginToSeeReviewText: string;
  cantViewReviewText: string;
  ratingIsText: string;
  outOfText: string;
  heartsIconText: string;
  detailsOfTheMaterialText: string;
  reserveText: string;
  editionsText: string;
  detailsText: string;
  reviewsText: string;
  typeText: string;
  languageText: string;
  contributorsText: string;
  originalTitleText: string;
  isbnText: string;
  editionText: string;
  scopeText: string;
  publisherText: string;
  audienceText: string;
  fictionNonfictionText: string;
  genreAndFormText: string;
  creatorsAreMissingText: string;
  goToEReolenText: string;
  readArticleText: string;
  loadingText: string;
  getOnlineText: string;
  seeOnlineText: string;
  cantReserveText: string;
  goToText: string;
  materialIsLoanedOutText: string;
  findOnShelfExpandButtonExplanationText: string;
  materialIsIncludedText: string;
  weHaveShoppedText: string;
  copiesThereIsText: string;
  reservationsForThisMaterialText: string;
  youHaveBorrowedText: string;
  possibleText: string;
  thisMonthText: string;
  approveReservationText: string;
  shiftText: string;
  pickupLocationText: string;
  receiveSmsWhenMaterialReadyText: string;
  receiveEmailWhenMaterialReadyText: string;
  haveNoInterestAfterText: string;
  oneMonthText: string;
  twoMonthsText: string;
  threeMonthsText: string;
  sixMonthsText: string;
  oneYearText: string;
  daysText: string;
  reservationSuccesTitleText: string;
  reservationSuccesIsReservedForYouText: string;
  reservationSuccesPreferredPickupBranchText: string;
  reservationErrorsTitleText: string;
  reservationErrorsDescriptionText: string;
  tryAginButtonText: string;
  okButtonText: string;
  missingDataText: string;
  reservationModalScreenReaderModalDescriptionText: string;
  reservationModalCloseModalAriaLabelText: string;
  librariesHaveTheMaterialText: string;
  findOnShelfModalScreenReaderModalDescriptionText: string;
  findOnShelfModalCloseModalAriaLabelText: string;
  numberInQueueText: string;
  queueText: string;
  alreadyReservedText: string;
  closeText: string;
}
interface MaterialEntryUrlProps {
  searchUrl: string;
  materialUrl: string;
}

export interface MaterialEntryProps
  extends MaterialEntryUrlProps,
    MaterialEntryTextProps {
  wid: WorkId;
}

const WrappedMaterialEntry: React.FC<MaterialEntryProps> = ({ wid }) => (
  <GuardedApp app="material">
    <Material wid={wid} />
  </GuardedApp>
);

export default withUrls(withText(WrappedMaterialEntry));
