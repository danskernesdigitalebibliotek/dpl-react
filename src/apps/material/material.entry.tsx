import * as React from "react";
import { withText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import { withUrls } from "../../core/utils/url";
import Material from "./material";

interface MaterialEntryTextProps {
  materialHeaderAuthorByText: string;
  periodikumSelectYearText: string;
  periodikumSelectWeekText: string;
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
  viewOnlineText: string;
  loadingText: string;
  getOnlineText: string;
  seeOnlineText: string;
  cantReserveText: string;
  goToText: string;
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

const MaterialEntry: React.FC<MaterialEntryProps> = ({ wid }) => {
  return <Material wid={wid} />;
};

export default withUrls(withText(MaterialEntry));
