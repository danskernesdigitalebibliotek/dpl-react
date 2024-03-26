import React from "react";
import GuardedApp from "../../components/guarded-app";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import OpeningHoursEditor from "./OpeningHoursEditor";

interface OpeningHoursEditorEntryTextProps {
  openingHoursRemoveEventButtonText: string;
}

const OpeningHoursEditorEntry: React.FC<
  OpeningHoursEditorEntryTextProps
> = () => (
  <GuardedApp app="opening-hours-editor">
    <OpeningHoursEditor />
  </GuardedApp>
);

export default withUrls(withText(OpeningHoursEditorEntry));
