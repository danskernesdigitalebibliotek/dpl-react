import React from "react";
import GuardedApp from "../../components/guarded-app";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import { withUrls } from "../../core/utils/url";
import RecommendedMaterial from "./RecommendedMaterial";

export interface RecommendedMaterialEntryProps {
  wid: WorkId;
}

const RecommendedMaterialEntry: React.FC<
  RecommendedMaterialEntryProps & GlobalEntryTextProps
> = ({ wid }) => (
  <GuardedApp app="recommended-material">
    <RecommendedMaterial wid={wid} />
  </GuardedApp>
);

export default withConfig(withUrls(withText(RecommendedMaterialEntry)));
