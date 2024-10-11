import React from "react";
import GuardedApp from "../../components/guarded-app";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import { withUrls } from "../../core/utils/url";
import RecommendedMaterial from "./RecommendedMaterial";

export interface RecommendedMaterialEntryProps {
  wid: WorkId;
  materialType?: ManifestationMaterialType;
  materialUrl?: string;
  etAlText?: string;
}

const RecommendedMaterialEntry: React.FC<
  RecommendedMaterialEntryProps & GlobalEntryTextProps
> = ({ wid, materialType }) => (
  <GuardedApp app="recommended-material">
    <RecommendedMaterial wid={wid} materialType={materialType} />
  </GuardedApp>
);

export default withConfig(withUrls(withText(RecommendedMaterialEntry)));
