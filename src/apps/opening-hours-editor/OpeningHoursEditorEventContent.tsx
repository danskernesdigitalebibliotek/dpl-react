import React from "react";
import { EventInput } from "@fullcalendar/core";

type OpeningHoursEditorEventContentProps = {
  eventInput: EventInput;
  handleEventRemove: (event: EventInput) => void;
};

const OpeningHoursEditorEventContent: React.FC<
  OpeningHoursEditorEventContentProps
> = ({ eventInput, handleEventRemove }) => {
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

        <span
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEventRemove(event);
          }}
          onClick={() => handleEventRemove(event)}
        >
          ❌
        </span>
      </div>
    </div>
  );
};

export default OpeningHoursEditorEventContent;
