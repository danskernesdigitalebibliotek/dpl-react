import React from "react";
import { EventInput } from "@fullcalendar/core";

type OpeningHoursEditorEventContentProps = {
  eventInput: EventInput;
  handleEventRemove: (event: EventInput) => void;
};

export default function OpeningHoursEditorEventContent({
  eventInput,
  handleEventRemove
}: OpeningHoursEditorEventContentProps): JSX.Element {
  const { event } = eventInput;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 10px",
        cursor: "pointer",
        height: "100%"
      }}
    >
      <b>{event.title}</b>
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
  );
}
