import * as React from "react";

import { useWorkRecommendationsQuery } from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import { Work } from "../../core/utils/types/entities";
import { WorkId } from "../../core/utils/types/ids";
import MaterialGrid, {
  MaterialGridItemProps
} from "../material-grid/MaterialGrid";
import MaterialGridSkeleton from "../material-grid/MaterialGridSkeleton";

export type MaterialGridRelatedProps = {
  work: Work;
};

const MaterialGridRelated: React.FC<MaterialGridRelatedProps> = ({ work }) => {
  const t = useText();
  const { pid } = work.manifestations.bestRepresentation;

  const title = t("materialGridRelatedTitleText");
  const { data } = useWorkRecommendationsQuery({
    pid: pid,
    limit: 8
  });

  if (!data?.recommend.result) {
    return <MaterialGridSkeleton title={title} />;
  }

  const materials: MaterialGridItemProps[] = data.recommend.result.map(
    ({ work }) => ({
      wid: work.workId as WorkId
    })
  );

  return (
    <div data-cy="material-grid-related">
      <MaterialGrid
        title={title}
        materials={materials}
        selectedAmountOfMaterialsForDisplay={8}
        initialMaximumDisplay={8}
      />
    </div>
  );
};

export default MaterialGridRelated;
