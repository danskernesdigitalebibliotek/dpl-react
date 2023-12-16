import React, { FC } from "react";
import Recommender from "./Recommender";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";
import GuardedApp from "../../components/guarded-app";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";

export interface RecommenderProps {
  emptyRecommenderSearchConfig: string;
  recommenderTitleLoansText: string;
  recommenderTitleReservationsText: string;
  materialByAuthorText: string;
  materialAndAuthorText: string;
  etAlText: string;
  recommenderTitleInspirationText: string;
}

export interface ReccommenderPropsInterface
  extends GlobalUrlEntryPropsInterface,
    GlobalEntryTextProps,
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
