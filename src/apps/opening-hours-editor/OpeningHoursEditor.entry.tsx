import React from "react";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import OpeningHoursEditor, {
  OpeningHoursEditorType
} from "./OpeningHoursEditor";
import { withConfig } from "../../core/utils/config";
import { getInitialDateFromUrl } from "./helper";

interface OpeningHoursEditorEntryTextProps {
  openingHoursLoadingText: string;
  openingHoursRemoveEventButtonText: string;
  openingHoursInvalidEventText: string;
  openingHoursEventFormCategoryText: string;
  openingHoursEventFormStartTimeText: string;
  openingHoursEventFormEndTimeText: string;
  openingHoursEventFormSubmitText: string;
  openingHoursEventFormRepeatedText: string;
  openingHoursEventFormEndDateText: string;
  openingHoursEventFormEveryWeekdayText: string;
  openingHoursEventFormStartDateText: string;
  openingHoursConfirmAddRepeatedText: string;
  openingHoursConfirmAddRepeatedCancelText: string;
  openingHoursConfirmRepeatedSubmitText: string;
  openingHoursRepeatedIconAltText: string;
  openingHoursEditEventConfirmOptionThisText: string;
  openingHoursEditEventConfirmOptionAllText: string;
  openingHoursRemoveEventTitleText: string;
  openingHoursEditEventTitleText: string;
}

interface OpeningHoursEditorEntryConfigProps {
  openingHoursEditorCategoriesConfig: string;
  openingHoursBranchIdConfig: string;
}

const OpeningHoursEditorEntry: React.FC<
  OpeningHoursEditorEntryTextProps &
    OpeningHoursEditorType &
    OpeningHoursEditorEntryConfigProps
> = ({ initialDate }) => {
  const initialDateParam = getInitialDateFromUrl();
  return (
    <OpeningHoursEditor
      initialDate={initialDate ?? (initialDateParam || new Date())}
    />
  );
};

export default withConfig(withUrls(withText(OpeningHoursEditorEntry)));
