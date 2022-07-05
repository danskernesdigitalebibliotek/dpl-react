import * as React from "react";
import { getParams } from "../../core/utils/helpers";
import { Pid, WorkId } from "../../core/utils/types/ids";
import Material from "./material";

export interface MaterialEntryProps {
  pid: Pid;
  workId: WorkId;
}

const MaterialEntry: React.FC<MaterialEntryProps> = ({ pid, workId }) => {
  // Get params either from data attributes or from url.
  const { pid: pPid, workId: pWorkId } = getParams({ pid, workId });

  return <Material pid={pPid} workId={pWorkId} />;
};

export default MaterialEntry;
