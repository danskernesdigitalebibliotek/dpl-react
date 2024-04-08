import React from "react";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import OpeningHoursEditor, {
  OpeningHoursEditorType
} from "./OpeningHoursEditor";
import { withConfig } from "../../core/utils/config";

interface OpeningHoursEditorEntryTextProps {
  openingHoursRemoveEventButtonText: string;
  openingHoursInvalidEventText: string;
  openingHoursEventFormTitleText: string;
  openingHoursEventFormStartTimeText: string;
  openingHoursEventFormEndTimeText: string;
  openingHoursEventFormSubmitText: string;
}

interface OpeningHoursEditorEntryConfigProps {
  openingHoursEditorCategoriesConfig: string;
  openingHoursBranchIdConfig: string;
}

const OpeningHoursEditorEntry: React.FC<
  OpeningHoursEditorEntryTextProps &
    OpeningHoursEditorType &
    OpeningHoursEditorEntryConfigProps
> = ({ initialDate = new Date() }) => {
  return <OpeningHoursEditor initialDate={initialDate} />;
};

export default withConfig(withUrls(withText(OpeningHoursEditorEntry)));
