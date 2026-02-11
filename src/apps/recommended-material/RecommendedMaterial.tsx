import * as React from "react";
import RecommendedMaterialComponent from "../../components/recommended-material/recommended-material";
import { WorkId } from "../../core/utils/types/ids";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";

export type RecommendedMaterialProps = {
  wid: WorkId;
  materialType?: ManifestationMaterialType;
  partOfGrid?: boolean;
};

const RecommendedMaterial: React.FC<RecommendedMaterialProps> = ({
  wid,
  materialType,
  partOfGrid = false
}) => {
  return (
    <RecommendedMaterialComponent
      wid={wid}
      materialType={materialType}
      partOfGrid={partOfGrid}
    />
  );
};
export default RecommendedMaterial;
