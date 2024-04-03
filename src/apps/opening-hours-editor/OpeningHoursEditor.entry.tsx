import React from "react";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import OpeningHoursEditor, {
  OpeningHoursEditorType
} from "./OpeningHoursEditor";
import { withConfig } from "../../core/utils/config";

interface OpeningHoursEditorEntryTextProps {
  openingHoursRemoveEventButtonText: string;
}

interface OpeningHoursEditorEntryConfigProps {
  openingHoursEditorCategoriesConfig: string;
  openingHoursBranchIdConfig: string;
}

const OpeningHoursEditorEntry: React.FC<
  OpeningHoursEditorEntryTextProps &
    OpeningHoursEditorType &
    OpeningHoursEditorEntryConfigProps
> = ({ useWireMockStartDate }) => (
  <OpeningHoursEditor useWireMockStartDate={useWireMockStartDate} />
);

export default withConfig(withUrls(withText(OpeningHoursEditorEntry)));
