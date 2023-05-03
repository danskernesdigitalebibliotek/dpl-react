import React, { FC } from "react";
import FavoritesListMaterialComponent from "./FavoritesListMaterialComponent";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";
import { FaustId } from "../../core/utils/types/ids";

export interface FavoritesListMaterialComponentProps {
  fbsBaseUrl: string;
  publizonBaseUrl: string;
  dplCmsBaseUrl: string;
  coverBaseUrl: string;
  materialBaseUrl: string;
  fbiBaseUrl: string;
  materialUrl: string;
  favoritesListMaterialComponentTitleText: string;
  materialByAuthorText: string;
  materialAndAuthorText: string;
  favoritesListMaterialComponentGoToListText: string;
  addToFavoritesAriaLabelText: string;
  removeFromFavoritesAriaLabelText: string;
}

const SomethingSimilarEntry: FC<FavoritesListMaterialComponentProps> = () => {
  return <FavoritesListMaterialComponent />;
};

export default withUrls(withConfig(withText(SomethingSimilarEntry)));
