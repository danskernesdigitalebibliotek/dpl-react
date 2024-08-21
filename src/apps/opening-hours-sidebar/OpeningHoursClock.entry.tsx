import React from "react";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import OpeningHoursClock from "./OpeningHoursClock";
import { withConfig } from "../../core/utils/config";

interface OpeningHoursClockEntryTextProps {
  openingHoursText: string;
}

const OpeningHoursClockEntry: React.FC<
  OpeningHoursClockEntryTextProps
> = () => {
  return <OpeningHoursClock />;
};

export default withConfig(withUrls(withText(OpeningHoursClockEntry)));
