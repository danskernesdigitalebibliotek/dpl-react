import * as React from "react";
import { getParams } from "../../core/utils/helpers";
import { withText } from "../../core/utils/text";
import { Pid, WorkId } from "../../core/utils/types/ids";
import Material from "./material";

interface MaterialEntryTextProps {
  materialHeaderAuthorByText: string;
  periodikumSelectYearText: string;
  periodikumSelectWeekText: string;
}

export interface MaterialEntryProps extends MaterialEntryTextProps {
  pid: Pid;
  workId: WorkId;
}

const MaterialEntry: React.FC<MaterialEntryProps> = ({ pid, workId }) => {
  // Get params either from data attributes or from url.
  const { pid: pPid, workId: pWorkId } = getParams({ pid, workId });

  return <Material pid={pPid} workId={pWorkId} />;
};

export default withText(MaterialEntry);
