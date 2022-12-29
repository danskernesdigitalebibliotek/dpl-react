import * as React from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import ButtonFavourite, {
  ButtonFavouriteId
} from "../../components/button-favourite/button-favourite";
import { Cover } from "../../components/cover/cover";
import { Work } from "../../core/dbc-gateway/generated/graphql";
import { getContributors } from "../../core/fetchers/helpers";
import { getManifestationPid } from "../../core/utils/helpers/general";
import { WorkId } from "../../core/utils/types/ids";
import { TypedDispatch } from "../../core/store";
import { guardedRequest } from "../../core/guardedRequests.slice";

export interface RecommendMaterialProps {
  work: Work;
  id: string;
}

const RecommendMaterial: FC<RecommendMaterialProps> = ({ work, id }) => {
  const { titles, creators, workId } = work || {};
  const { full } = titles;
  let contributors = null;

  const inputContributorsArray = creators?.map(({ display }) => display);
  if (inputContributorsArray) {
    contributors = getContributors(inputContributorsArray);
  }
  const dispatch = useDispatch<TypedDispatch>();
  const { manifestations } = work;
  const manifestationPid = getManifestationPid(manifestations.all);

  const addToListRequest = (materialId: ButtonFavouriteId) => {
    dispatch(
      guardedRequest({
        type: "addFavorite",
        args: { materialId },
        app: "search-result"
      })
    );
  };
  return (
    <div className="recommender__grid__material">
      <Cover animate size="medium" id={manifestationPid} />
      <ButtonFavourite
        id={workId as WorkId}
        addToListRequest={addToListRequest}
      />
      <div className="recommender__grid__material__text">
        <div className="recommender__grid__material__text__title">
          {String(full)}
        </div>
        <div className="recommender__grid__material__text__author">
          {contributors}
        </div>
      </div>
    </div>
  );
};

export default RecommendMaterial;
