import React, { FC } from "react";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import OpeningHoursSidebar, {
  OpeningHoursSidebarType
} from "./OpeningHoursSidebar";
import { withConfig } from "../../core/utils/config";

interface OpeningHoursClockEntryTextProps {
  openingHoursText: string;
  openingHoursSidebarTodayText: string;
}

const OpeningHoursSidebarEntry: FC<
  OpeningHoursClockEntryTextProps & OpeningHoursSidebarType
> = ({ size }) => {
  return <OpeningHoursSidebar size={size} />;
};

export default withConfig(withUrls(withText(OpeningHoursSidebarEntry)));
