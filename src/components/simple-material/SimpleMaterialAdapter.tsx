import React, { FC } from "react";
import { useGetSmallWorkQuery } from "../../core/dbc-gateway/generated/graphql";
import { WorkSmall } from "../../core/utils/types/entities";
import { Pid, GuardedAppId } from "../../core/utils/types/ids";
import SimpleMaterial from "./SimpleMaterial";

export interface SimpleMaterialAdapterProps {
  pid: Pid;
  app: GuardedAppId;
  bright?: boolean;
}

const SimpleMaterialAdapter: FC<SimpleMaterialAdapterProps> = ({
  pid,
  app,
  bright
}) => {
  const { data } = useGetSmallWorkQuery({
    id: pid
  });
  return (
    <div>
      {data && data.work && (
        <SimpleMaterial
          key={data.work?.workId}
          work={data.work as WorkSmall}
          app={app}
          bright={bright}
        />
      )}
    </div>
  );
};

export default SimpleMaterialAdapter;
