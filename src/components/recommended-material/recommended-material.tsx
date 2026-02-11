import clsx from "clsx";
import * as React from "react";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { getManifestationBasedOnType } from "../../apps/material/helper";
import RecommendedMaterialSkeleton from "./RecommendedMaterialSkeleton";
import Link from "../../components/atoms/links/Link";
import ButtonFavourite, {
  ButtonFavouriteId
} from "../../components/button-favourite/button-favourite";
import { Cover } from "../../components/cover/cover";
import { useGetMaterialQuery } from "../../core/dbc-gateway/generated/graphql";
import { guardedRequest } from "../../core/guardedRequests.slice";
import { TypedDispatch } from "../../core/store";
import {
  creatorsToString,
  flattenCreators
} from "../../core/utils/helpers/general";
import { constructMaterialUrl } from "../../core/utils/helpers/url";
import { useText } from "../../core/utils/text";
import { Work } from "../../core/utils/types/entities";
import { WorkId } from "../../core/utils/types/ids";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import { useUrls } from "../../core/utils/url";
import { useEventStatistics } from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";

export type RecommendedMaterialProps = {
  wid: WorkId;
  materialType?: ManifestationMaterialType;
  partOfGrid?: boolean;
};

const RecommendedMaterialComp: React.FC<RecommendedMaterialProps> = ({
  wid,
  materialType,
  partOfGrid = false
}) => {
  const t = useText();
  const u = useUrls();
  const { track } = useEventStatistics();
  const materialUrl = u("materialUrl");
  const dispatch = useDispatch<TypedDispatch>();
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetMaterialQuery({
    wid
  });

  if (isLoading || !data?.work) {
    return <RecommendedMaterialSkeleton partOfGrid={partOfGrid} />;
  }

  const {
    work: {
      titles: { full: fullTitle },
      manifestations: { bestRepresentation },
      creators
    }
  } = data;

  const work = data.work as Work;
  const materialManifestationForDisplay = materialType
    ? getManifestationBasedOnType(work, materialType)
    : bestRepresentation;

  const { pid } = materialManifestationForDisplay;

  const author = creatorsToString(flattenCreators(creators), t);

  const materialFullUrl = constructMaterialUrl(materialUrl, wid, materialType);
  const addToListRequest = (id: ButtonFavouriteId) => {
    dispatch(
      guardedRequest({
        type: "addFavorite",
        args: { id, queryClient },
        app: "material"
      })
    );
  };

  const trackData = () =>
    track("click", {
      id: statistics.recommendedMaterial.id,
      name: statistics.recommendedMaterial.name,
      trackedData: wid
    });

  return (
    <div
      className={clsx(
        "recommended-material",
        partOfGrid && "recommended-material--in-grid"
      )}
    >
      <div className="recommended-material__icon">
        <ButtonFavourite
          title={String(fullTitle)}
          id={wid}
          addToListRequest={addToListRequest}
        />
      </div>
      <Cover
        ids={[pid]}
        url={materialFullUrl}
        size="large"
        animate
        alt=""
        shadow="medium"
        trackClick={trackData}
      />
      <div className="recommended-material__texts">
        <Link
          href={materialFullUrl}
          className="recommended-material__description"
          dataCy="recommended-description"
          trackClick={trackData}
        >
          {fullTitle}
        </Link>
        <Link
          href={materialFullUrl}
          className="recommended-material__author"
          dataCy="recommended-author"
          trackClick={trackData}
        >
          {author}
        </Link>
      </div>
    </div>
  );
};
export default RecommendedMaterialComp;
