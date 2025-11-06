import React from "react";
import GuardedApp from "../../components/guarded-app";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import { withUrls } from "../../core/utils/url";
import Recommendation from "./recommendation";

export interface RecommendationEntryProps extends GlobalEntryTextProps {
  wid: WorkId;
  materialType?: ManifestationMaterialType;
  positionImageRight?: boolean;
  materialUrl: string;
  etAlText: string;
  title?: string;
  description?: string;
}

const RecommendationEntry: React.FC<RecommendationEntryProps> = ({
  wid,
  materialType,
  positionImageRight,
  title,
  description
}) => (
  <GuardedApp app="recommendation">
    <Recommendation
      wid={wid}
      materialType={materialType}
      positionImageRight={positionImageRight}
      title={title}
      description={description}
    />
  </GuardedApp>
);

export default withConfig(withUrls(withText(RecommendationEntry)));
