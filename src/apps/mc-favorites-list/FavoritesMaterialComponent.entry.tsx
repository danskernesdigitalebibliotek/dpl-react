import React, { FC } from "react";
import SomethingSimilar from "./FavoritesMaterialComponent";
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
  materialByAuthorText: string;
  materialAndAuthorText: string;
  somethingSimilarByTheSameAuthorText: string;
  somethingSimilarSomethingSimilarAuthorText: string;
}

const SomethingSimilarEntry: FC<FavoritesMaterialComponentProps> = () => (
  <SomethingSimilar />
);

export default withUrls(withConfig(withText(SomethingSimilarEntry)));
