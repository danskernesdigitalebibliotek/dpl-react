import React, { FC } from "react";
import FavoritesMC from "./FavoritesMaterialComponent";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";

export interface FavoritesMaterialComponentProps {
  fbsBaseUrl: string;
  publizonBaseUrl: string;
  dplCmsBaseUrl: string;
  coverBaseUrl: string;
  materialBaseUrl: string;
  fbiBaseUrl: string;
  materialUrl: string;
  favoritesMaterialComponentTitleText: string;
  goToYourFavoritesListText: string;
  // goToYourFavoritesListUrl: string;
}

const FavoritesMaterialComponent: FC<FavoritesMaterialComponentProps> = () => (
  <FavoritesMC />
);

export default withUrls(withConfig(withText(FavoritesMaterialComponent)));
