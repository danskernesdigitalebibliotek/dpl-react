import React from "react";
import GuardedApp from "../../components/guarded-app";
import { withText } from "../../core/utils/text";

import Calendar from "./calendar";
import { withUrls } from "../../core/utils/url";

const CalendarEntry: React.FC = () => (
  <GuardedApp app="calendar">
    <Calendar />
  </GuardedApp>
);

export default withUrls(withText(CalendarEntry));
