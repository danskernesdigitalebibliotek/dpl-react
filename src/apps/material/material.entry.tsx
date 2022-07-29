import * as React from "react";
import { withText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import Material from "./material";

interface MaterialEntryTextProps {
  materialHeaderAuthorByText: string;
  periodikumSelectYearText: string;
  periodikumSelectWeekText: string;
  descriptionHeadlineText: string;
}

export interface MaterialEntryProps extends MaterialEntryTextProps {
  pid: Pid;
}

const MaterialEntry: React.FC<MaterialEntryProps> = ({ pid }) => {
  return <Material pid={pid} />;
};

export default withText(MaterialEntry);
