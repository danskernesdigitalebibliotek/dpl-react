import * as React from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import ButtonFavourite, {
  ButtonFavouriteId
} from "../button-favourite/button-favourite";
import { Cover } from "../cover/cover";
import { Work } from "../../core/utils/types/entities";
import {
  getContributors,
  getManifestationPid
} from "../../core/utils/helpers/general";
import { TypedDispatch } from "../../core/store";
import { guardedRequest } from "../../core/guardedRequests.slice";
import { constructMaterialUrl } from "../../core/utils/helpers/url";
import Link from "../atoms/links/Link";
import { useUrls } from "../../core/utils/url";
import { useText } from "../../core/utils/text";
import { GuardedAppId } from "../../core/utils/types/ids";

export interface SimpleMaterialProps {
  work: Work;
  bright?: boolean;
  app: GuardedAppId;
}

const SimpleMaterial: FC<SimpleMaterialProps> = ({
  bright,
  work: {
    titles: { full: fullTitle },
    creators,
    workId,
    manifestations: { all: manifestations }
  },
  app
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

  const addToListRequest = (id: ButtonFavouriteId) => {
    dispatch(
      guardedRequest({
        type: "addFavorite",
        args: { id },
        app
      })
    );
  };

  const title = fullTitle[0];

  return (
    <li
      className={`simple-material ${bright ? " simple-material--bright" : ""}`}
    >
      <div className="simple-material__cover-container">
        <Cover animate size="medium" id={manifestationPid} />
      </div>
      <div className="simple-material__favourite">
        <ButtonFavourite
          title={title}
          darkBackground={!bright}
          id={workId}
          addToListRequest={addToListRequest}
        />
      </div>
      <div className="simple-material__meta">
        <Link href={materialFullUrl} className="simple-material__title">
          {title}
        </Link>
        <div className="simple-material__author">{authors}</div>
      </div>
    </li>
  );
};

export default SimpleMaterial;
