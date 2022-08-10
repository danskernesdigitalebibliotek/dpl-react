import * as React from "react";
import { withText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import { withUrl } from "../../core/utils/url";
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
}
interface MaterialEntryUrlProps {
  searchUrl: string;
  materialUrl: string;
}

export interface MaterialEntryProps
  extends MaterialEntryUrlProps,
    MaterialEntryTextProps {
  pid: Pid;
}

const MaterialEntry: React.FC<MaterialEntryProps> = ({ pid }) => {
  return <Material pid={pid} />;
};

export default withUrl(withText(MaterialEntry));
