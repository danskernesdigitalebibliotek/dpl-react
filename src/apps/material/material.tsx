import React from "react";
import { Pid, WorkId } from "../../core/utils/types/ids";

export interface MaterialProps {
  pid: Pid;
  workId: WorkId;
}

const Material: React.FC<MaterialProps> = ({ pid, workId }) => {
  // This is placeholder code to show the pid and workId from the url or storybook.
  return (
    <div>
      <div>
        pid:
        <br />
        {pid}
      </div>
      <div>
        workId:
        <br />
        {workId}
      </div>
    </div>
  );
};

export default Material;
