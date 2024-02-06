import React from "react";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { withText } from "../../core/utils/text";
import Recommendation from "./recommendation";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";
import { WorkId } from "../../core/utils/types/ids";
import GuardedApp from "../../components/guarded-app";

export interface RecommendationEntryProps extends GlobalEntryTextProps {
  wid: WorkId;
  positionImageRight?: boolean;
}

const RecommendationEntry: React.FC<RecommendationEntryProps> = ({
  wid,
  positionImageRight
}) => (
  <GuardedApp app="recommendation">
    <Recommendation wid={wid} positionImageRight={positionImageRight} />
  </GuardedApp>
);

export default withConfig(withUrls(withText(RecommendationEntry)));
