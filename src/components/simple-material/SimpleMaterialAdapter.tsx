import React, { FC } from "react";
import { useGetFavoriteMaterialManifestationQuery } from "../../core/dbc-gateway/generated/graphql";
import { Work } from "../../core/utils/types/entities";
import { Pid, GuardedAppId } from "../../core/utils/types/ids";
import SimpleMaterial from "./SimpleMaterial";

export interface SimpleMaterialAdapterProps {
  pid: Pid;
  appTag: GuardedAppId;
  bright?: boolean;
}

const SimpleMaterialAdapter: FC<SimpleMaterialAdapterProps> = ({
  pid,
  appTag,
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
          appTag={appTag}
          bright={bright}
        />
      )}
    </div>
  );
};

export default SimpleMaterialAdapter;
