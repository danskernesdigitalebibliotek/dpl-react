import React, { FC } from "react";
import Recommender from "./Recommender";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";
import GuardedApp from "../../components/guarded-app";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";

export interface RecommenderProps {
  emptyRecommenderSearchConfig: string;
  recommenderTitleLoansText: string;
  recommenderTitleReservationsText: string;
  materialByAuthorText: string;
  etAlText: string;
  recommenderTitleInspirationText: string;
  addToFavoritesAriaLabelText: string;
  removeFromFavoritesAriaLabelText: string;
}

export interface ReccommenderPropsInterface
  extends GlobalUrlEntryPropsInterface,
    RecommenderProps {
  q?: string;
  pageSizeDesktop?: number;
  pageSizeMobile?: number;
}

const RecommenderEntry: FC<ReccommenderPropsInterface> = () => (
  <GuardedApp app="recommender">
    <Recommender />
  </GuardedApp>
);

export default withUrls(withConfig(withText(RecommenderEntry)));
