import clsx from "clsx";
import * as React from "react";
import Arrow from "../../components/atoms/icons/arrow/arrow";
import Link from "../../components/atoms/links/Link";
import { useGetMaterialQuery } from "../../core/dbc-gateway/generated/graphql";
import { constructMaterialUrl } from "../../core/utils/helpers/url";
import { WorkId } from "../../core/utils/types/ids";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import { useUrls } from "../../core/utils/url";

import RecommendationMaterialSkeleton from "./RecommendationSkeleton";
import RecommendedMaterial from "../../components/recommended-material/recommended-material";

export type RecommendationProps = {
  wid: WorkId;
  materialType?: ManifestationMaterialType;
  positionImageRight?: boolean;
};

const Recommendation: React.FC<RecommendationProps> = ({
  wid,
  materialType,
  positionImageRight
}) => {
  const u = useUrls();

  const materialUrl = u("materialUrl");

  const { data, isLoading } = useGetMaterialQuery({
    wid
  });

  if (isLoading || !data?.work) {
    return <RecommendationMaterialSkeleton />;
  }

  const {
    work: {
      titles: { full: materialFullTitle },
      abstract
    }
  } = data;

  const materialFullUrl = constructMaterialUrl(materialUrl, wid, materialType);
  const materialDescription = abstract?.[0];

  return (
    <div
      className={clsx(
        "recommendation",
        positionImageRight && "recommendation--reversed"
      )}
      data-cy="recommendation"
    >
      <RecommendedMaterial wid={wid} materialType={materialType} />
      <Link
        href={materialFullUrl}
        className="recommendation__texts arrow__hover--right-small"
      >
        <h3 className="recommendation__title" data-cy="recommendation-title">
          {materialFullTitle}
        </h3>
        <p
          className="recommendation__description"
          data-cy="recommendation-description"
        >
          {materialDescription}
        </p>
        <Arrow />
      </Link>
    </div>
  );
};
export default Recommendation;
