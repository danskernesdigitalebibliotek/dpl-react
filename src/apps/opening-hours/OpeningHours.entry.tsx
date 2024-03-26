import React from "react";
import GuardedApp from "../../components/guarded-app";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import OpeningHours from "./OpeningHours";

export interface OpeningHoursEntryProps {
  title: string;
  branchId: number;
}

const OpeningHoursEntry: React.FC<
  OpeningHoursEntryProps & GlobalEntryTextProps
> = ({ title, branchId }) => (
  <GuardedApp app="opening-hours">
    <OpeningHours title={title} branchId={branchId} />
  </GuardedApp>
);

export default withConfig(withUrls(withText(OpeningHoursEntry)));
