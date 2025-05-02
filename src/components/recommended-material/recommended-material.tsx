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
      creators
    }
  } = data;

  const work = data.work as Work;

  const materialManifestationForDisplay = getManifestationBasedOnType(
    work,
    materialType
  );

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
        pid={pid}
        url={materialFullUrl}
        size="large"
        animate
        alt=""
        shadow="medium"
      />
      <div className="recommended-material__texts">
        <Link
          href={materialFullUrl}
          className="recommended-material__description"
          dataCy="recommended-description"
        >
          {fullTitle}
        </Link>
        <Link
          href={materialFullUrl}
          className="recommended-material__author"
          dataCy="recommended-author"
        >
          {author}
        </Link>
      </div>
    </div>
  );
};
export default RecommendedMaterialComp;
