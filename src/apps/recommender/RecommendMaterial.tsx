import * as React from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import ButtonFavourite, {
  ButtonFavouriteId
} from "../../components/button-favourite/button-favourite";
import { Cover } from "../../components/cover/cover";
import { Work } from "../../core/utils/types/entities";
import {
  getContributors,
  getManifestationPid
} from "../../core/utils/helpers/general";
import { TypedDispatch } from "../../core/store";
import { guardedRequest } from "../../core/guardedRequests.slice";
import { constructMaterialUrl } from "../../core/utils/helpers/url";
import Link from "../../components/atoms/links/Link";
import { useUrls } from "../../core/utils/url";
import { useText } from "../../core/utils/text";

export interface RecommendMaterialProps {
  work: Work;
}

const RecommendMaterial: FC<RecommendMaterialProps> = ({
  work: {
    titles: { full: title },
    creators,
    workId,
    manifestations: { all: manifestations }
  }
}) => {
  const dispatch = useDispatch<TypedDispatch>();
  const { materialUrl } = useUrls();
  const materialFullUrl = constructMaterialUrl(materialUrl, workId);

  const t = useText();

  // Create authors string
  let authors = null;
  const inputContributorsArray = creators?.map(({ display }) => display);
  if (inputContributorsArray) {
    authors = getContributors(
      inputContributorsArray,
      t("materialByAuthorText"),
      t("materialAndAuthorText")
    );
  }

  // For retrieving cover
  const manifestationPid = getManifestationPid(manifestations);

  const addToListRequest = (materialId: ButtonFavouriteId) => {
    dispatch(
      guardedRequest({
        type: "addFavorite",
        args: { materialId },
        app: "recommender"
      })
    );
  };

  return (
    <li className="recommender-material">
      <div className="recommender-material__cover-container">
        <Cover animate size="medium" id={manifestationPid} />
      </div>
      <div className="recommender-material__favourite">
        <ButtonFavourite
          bright
          id={workId}
          addToListRequest={addToListRequest}
        />
      </div>
      <div className="recommender-material__meta">
        <Link
          href={materialFullUrl}
          className="recommender-material__meta__title"
        >
          {String(title)}
        </Link>
        <div className="recommender-material__meta__author">{authors}</div>
      </div>
    </li>
  );
};

export default RecommendMaterial;
