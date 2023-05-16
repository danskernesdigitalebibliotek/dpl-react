import React, { FC } from "react";
import { useGetFavoriteMaterialManifestationQuery } from "../../core/dbc-gateway/generated/graphql";
import { Work } from "../../core/utils/types/entities";
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
  const { data } = useGetFavoriteMaterialManifestationQuery({
    id: pid
  });
  return (
    <div>
      {data && data.work && (
        <SimpleMaterial
          key={data.work?.workId}
          work={data.work as Work}
          app={app}
          bright={bright}
        />
      )}
    </div>
  );
};

export default SimpleMaterialAdapter;
