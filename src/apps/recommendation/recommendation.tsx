import clsx from "clsx";
import * as React from "react";
import Arrow from "../../components/atoms/icons/arrow/arrow";
import Link from "../../components/atoms/links/Link";
import { useGetMaterialQuery } from "../../core/dbc-gateway/generated/graphql";
import { constructMaterialUrl } from "../../core/utils/helpers/url";
import { WorkId } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import RecommendedMaterial from "../recommended-material/RecommendedMaterial";
import RecommendationMaterialSkeleton from "./RecommendationSkeleton";

export type RecommendationProps = {
  positionImageRight?: boolean;
  wid: WorkId;
};

const Recommendation: React.FC<RecommendationProps> = ({
  positionImageRight,
  wid
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

  const materialFullUrl = constructMaterialUrl(materialUrl, wid);
  const materialDescription = abstract?.[0];

  return (
    <div
      className={clsx(
        "recommendation",
        positionImageRight && "recommendation--reversed"
      )}
      data-cy="recommendation"
    >
      <RecommendedMaterial wid={wid} />
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
