import * as React from "react";
import { withText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
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
}

export interface MaterialEntryProps extends MaterialEntryTextProps {
  pid: Pid;
  searchUrl: string;
}

const MaterialEntry: React.FC<MaterialEntryProps> = ({ pid, searchUrl }) => {
  return <Material pid={pid} searchUrl={searchUrl} />;
};

export default withText(MaterialEntry);
