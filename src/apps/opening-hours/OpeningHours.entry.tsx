import React from "react";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import OpeningHours from "./OpeningHours";
import { getInitialDateFromUrl } from "../opening-hours-editor/helper";

export interface OpeningHoursEntryProps {
  branchId: number;
  initialDate?: string;
  showOpeningHoursForWeekText: string;
  weekText: string;
  libraryIsClosedText: string;
  openingHoursHeadingText: string;
}

const OpeningHoursEntry: React.FC<
  OpeningHoursEntryProps & GlobalEntryTextProps
> = ({ branchId, initialDate }) => {
  const initialDateParam = getInitialDateFromUrl();
  return (
    <OpeningHours
      branchId={branchId}
      initialDate={initialDate ?? initialDateParam}
    />
  );
};

export default withConfig(withUrls(withText(OpeningHoursEntry)));
