import React, { FC } from "react";
import Recommender from "./Recommender";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";

export interface RecommenderProps {
  fbsBaseUrl: string;
  publizonBaseUrl: string;
  dplCmsBaseUrl: string;
  coverBaseUrl: string;
  materialBaseUrl: string;
  fbiBaseUrl: string;
}

const RecommenderEntry: FC<RecommenderProps> = () => <Recommender />;

export default withUrls(withConfig(withText(RecommenderEntry)));
