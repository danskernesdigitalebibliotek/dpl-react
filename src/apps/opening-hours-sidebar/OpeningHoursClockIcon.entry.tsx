import React from "react";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import OpeningHoursClockIcon from "./OpeningHoursClockIcon";
import { withConfig } from "../../core/utils/config";

interface OpeningHoursClockIconEntryTextProps {
  openingHoursText: string;
}

const OpeningHoursClockIconEntry: React.FC<
  OpeningHoursClockIconEntryTextProps
> = () => {
  return <OpeningHoursClockIcon />;
};

export default withConfig(withUrls(withText(OpeningHoursClockIconEntry)));
