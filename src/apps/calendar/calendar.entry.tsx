import React from "react";
import GuardedApp from "../../components/guarded-app";
import { withText } from "../../core/utils/text";

import Calendar from "./calendar";

const CalendarEntry: React.FC = () => (
  <GuardedApp app="calendar">
    <Calendar />
  </GuardedApp>
);

export default withText(CalendarEntry);
