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
          {extractTime(event.start)} - {extractTime(event.end)}
        </span>
      </div>
    </div>
  );
};

export default OpeningHoursEditorEventContent;
