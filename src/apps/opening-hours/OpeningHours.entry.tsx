import React from "react";
import GuardedApp from "../../components/guarded-app";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import OpeningHours from "./OpeningHours";

export interface OpeningHoursEntryProps {
  branchId: number;
  initialDate?: Date;
}

const OpeningHoursEntry: React.FC<
  OpeningHoursEntryProps & GlobalEntryTextProps
> = ({ branchId, initialDate = new Date() }) => {
  return <OpeningHours branchId={branchId} initialDate={initialDate} />;
};

export default withConfig(withUrls(withText(OpeningHoursEntry)));
