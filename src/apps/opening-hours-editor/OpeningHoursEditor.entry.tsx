import React from "react";
import GuardedApp from "../../components/guarded-app";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import OpeningHoursEditor from "./OpeningHoursEditor";

const CalendarEntry: React.FC = () => (
  <GuardedApp app="opening-hours-editor">
    <OpeningHoursEditor />
  </GuardedApp>
);

export default withUrls(withText(CalendarEntry));
