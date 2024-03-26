import React from "react";
import { EventInput } from "@fullcalendar/core";

type OpeningHoursEditorEventContentProps = {
  eventInput: EventInput;
};

const OpeningHoursEditorEventContent: React.FC<
  OpeningHoursEditorEventContentProps
> = ({ eventInput }) => {
  const { event } = eventInput;
  return (
    <div
      style={{
        padding: "5px 10px",
        cursor: "pointer",
        width: "100%"
      }}
    >
      <b>{event.title}</b>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <span>
          {event.start?.toLocaleTimeString()} -{" "}
          {event.end?.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default OpeningHoursEditorEventContent;
