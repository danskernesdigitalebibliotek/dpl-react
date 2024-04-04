import React from "react";
import { EventInput } from "@fullcalendar/core";
import { extractTime } from "./helper";

type OpeningHoursEditorEventContentProps = {
  eventInput: EventInput;
};

const OpeningHoursEditorEventContent: React.FC<
  OpeningHoursEditorEventContentProps
> = ({ eventInput }) => {
  const { event } = eventInput;
  return (
    <div className="opening-hours-editor-event-content">
      <b>{event.title}</b>
      <div>
        {extractTime(event.start)} - {extractTime(event.end)}
      </div>
    </div>
  );
};

export default OpeningHoursEditorEventContent;
