import * as React from "react";
import { useDispatch } from "react-redux";
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
import { DisplayMaterialType } from "../../core/utils/types/material-type";
import { useUrls } from "../../core/utils/url";
import { getManifestationBasedOnType } from "../material/helper";
import RecommendedMaterialSkeleton from "./RecommendedMaterialSkeleton";

export type RecommendedMaterialProps = {
  wid: WorkId;
  materialType?: DisplayMaterialType;
  partOfGrid?: boolean;
};

const RecommendedMaterial: React.FC<RecommendedMaterialProps> = ({
  wid,
  materialType,
  partOfGrid = false
}) => {
  const t = useText();
  const u = useUrls();
  const materialUrl = u("materialUrl");
  const dispatch = useDispatch<TypedDispatch>();

  const { data, isLoading } = useGetMaterialQuery({
    wid
  });

  if (isLoading || !data?.work) {
    return <RecommendedMaterialSkeleton />;
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
        args: { id },
        app: "material"
      })
    );
  };

  return (
    <div
      className={`recommended-material ${
        partOfGrid && "recommended-material--in-grid "
      }`}
    >
      <div className="recommended-material__icon">
        <ButtonFavourite
          title={String(fullTitle)}
          id={wid}
          addToListRequest={addToListRequest}
        />
      </div>
      <Cover
        id={pid}
        url={materialFullUrl}
        size="large"
        animate
        alt=""
        shadow="medium"
      />
      <div className="recommended-material__texts">
        <p
          className="recommended-material__description"
          data-cy="recommended-description"
        >
          {fullTitle}
        </p>
        <p
          className="recommended-material__author"
          data-cy="recommended-author"
        >
          {author}{" "}
        </p>
      </div>
    </div>
  );
};
export default RecommendedMaterial;
