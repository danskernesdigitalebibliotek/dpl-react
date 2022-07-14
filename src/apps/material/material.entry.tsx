import * as React from "react";
import { getParams } from "../../core/utils/helpers";
import { withText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import Material from "./material";

interface MaterialEntryTextProps {
  materialHeaderAuthorByText: string;
  periodikumSelectYearText: string;
  periodikumSelectWeekText: string;
}

export interface MaterialEntryProps extends MaterialEntryTextProps {
  pid: Pid;
}

const MaterialEntry: React.FC<MaterialEntryProps> = ({ pid }) => {
  // Get params either from data attributes or from url.
  const { pid: pPid } = getParams({ pid });

  return <Material pid={pPid} />;
};

export default withText(MaterialEntry);
