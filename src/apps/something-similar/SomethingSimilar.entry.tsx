import React, { FC } from "react";
import SomethingSimilar from "./SomethingSimilar";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";
import { FaustId } from "../../core/utils/types/ids";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";

export interface SomethingSimilarProps {
  fbsBaseUrl: string;
  publizonBaseUrl: string;
  dplCmsBaseUrl: string;
  coverBaseUrl: string;
  materialBaseUrl: string;
  fbiBaseUrl: string;
  materialUrl: string;
  somethingSimilarTitleText: string;
  materialByAuthorText: string;
  materialAndAuthorText: string;
  etAlText: string;
  somethingSimilarByTheSameAuthorText: string;
  somethingSimilarSomethingSimilarAuthorText: string;
  addToFavoritesAriaLabelText: string;
  removeFromFavoritesAriaLabelText: string;
  faust: FaustId;
}

const SomethingSimilarEntry: FC<
  SomethingSimilarProps & GlobalEntryTextProps
> = ({ faust }) => {
  return <SomethingSimilar faust={faust} />;
};

export default withUrls(withConfig(withText(SomethingSimilarEntry)));
