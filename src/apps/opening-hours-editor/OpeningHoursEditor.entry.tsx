import React from "react";
import GuardedApp from "../../components/guarded-app";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import OpeningHoursEditor, {
  OpeningHoursEditorType
} from "./OpeningHoursEditor";

interface OpeningHoursEditorEntryTextProps {
  openingHoursRemoveEventButtonText: string;
}

const OpeningHoursEditorEntry: React.FC<
  OpeningHoursEditorEntryTextProps & OpeningHoursEditorType
> = ({ openingHoursCategories, openingHoursBranchId }) => (
  <GuardedApp app="opening-hours-editor">
    <OpeningHoursEditor
      openingHoursCategories={openingHoursCategories}
      openingHoursBranchId={openingHoursBranchId}
    />
  </GuardedApp>
);

export default withUrls(withText(OpeningHoursEditorEntry));
