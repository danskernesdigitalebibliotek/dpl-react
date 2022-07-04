import * as React from "react";
import { getUrlQueryParam } from "../../core/utils/helpers";
import { Pid, WorkId } from "../../core/utils/types/ids";
import Material from "./material";

export interface MaterialEntryProps {
  pid: Pid;
  workId: WorkId;
}

const MaterialEntry: React.FC<MaterialEntryProps> = ({
  pid: attrPid,
  workId: attrWorkId
}) => {
  // If a pid or workId string has been defined as a data attributes use that
  // otherwise use the one from the url query parameter.

  const pidQuery = attrPid || (getUrlQueryParam("pid") as string);
  const workIdQuery = attrWorkId || (getUrlQueryParam("workId") as string);

  return <Material pid={pidQuery} workId={workIdQuery} />;
};

export default MaterialEntry;
