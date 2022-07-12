import React from "react";
import MaterialHeader from "../../components/material/MaterialHeader";
import { useGetWorkQuery } from "../../core/dbc-gateway/generated/graphql";
import { Pid, WorkId } from "../../core/utils/types/ids";

export interface MaterialProps {
  pid: Pid;
  workId: WorkId;
  showPeriodikumSelect?: boolean;
}

const Material: React.FC<MaterialProps> = ({
  pid,
  workId,
  showPeriodikumSelect
}) => {
  const { data, isLoading } = useGetWorkQuery({
    id: workId
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      {data?.work && (
        <MaterialHeader
          pid={pid}
          work={data.work}
          showPeriodikumSelect={showPeriodikumSelect}
        />
      )}
    </main>
  );
};

export default Material;
