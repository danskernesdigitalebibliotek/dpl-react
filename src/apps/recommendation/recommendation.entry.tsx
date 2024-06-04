import React from "react";
import GuardedApp from "../../components/guarded-app";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import { DisplayMaterialType } from "../../core/utils/types/material-type";
import { withUrls } from "../../core/utils/url";
import Recommendation from "./recommendation";

export interface RecommendationEntryProps extends GlobalEntryTextProps {
  wid: WorkId;
  materialType?: DisplayMaterialType;
  positionImageRight?: boolean;
}

const RecommendationEntry: React.FC<RecommendationEntryProps> = ({
  wid,
  materialType,
  positionImageRight
}) => (
  <GuardedApp app="recommendation">
    <Recommendation
      wid={wid}
      materialType={materialType}
      positionImageRight={positionImageRight}
    />
  </GuardedApp>
);

export default withConfig(withUrls(withText(RecommendationEntry)));
