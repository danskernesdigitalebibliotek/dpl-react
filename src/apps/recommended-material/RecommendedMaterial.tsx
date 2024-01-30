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
import { WorkId } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import RecommendedMaterialSkeleton from "./RecommendedMaterialSkeleton";

export type RecommendedMaterialProps = {
  wid: WorkId;
};

const RecommendedMaterial: React.FC<RecommendedMaterialProps> = ({ wid }) => {
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
      manifestations: { bestRepresentation: manifestations },
      creators
    }
  } = data;

  const { pid } = manifestations;

  const author = creatorsToString(flattenCreators(creators), t);
  const materialFullUrl = constructMaterialUrl(materialUrl, wid);
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
    <div className="recommended-material">
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
