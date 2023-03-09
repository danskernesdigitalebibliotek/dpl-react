import React, { FC } from "react";
import Recommender from "./Recommender";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";
import GuardedApp from "../../components/guarded-app";

export interface RecommenderProps {
  emptyRecommenderSearchConfig: string;
  fbsBaseUrl: string;
  publizonBaseUrl: string;
  dplCmsBaseUrl: string;
  coverBaseUrl: string;
  materialBaseUrl: string;
  fbiBaseUrl: string;
  materialUrl: string;
  recommenderTitleLoansText: string;
  recommenderTitleReservationsText: string;
  materialByAuthorText: string;
  materialAndAuthorText: string;
  recommenderTitleInspirationText: string;
  addToFavoritesAriaLabelText: string;
  removeFromFavoritesAriaLabelText: string;
}

const RecommenderEntry: FC<RecommenderProps> = () => (
  <GuardedApp app="recommender">
    <Recommender />
  </GuardedApp>
);

export default withUrls(withConfig(withText(RecommenderEntry)));
