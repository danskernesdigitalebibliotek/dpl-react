import React from "react";
import logo from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/logo/reload_logo_black.svg";
import { EventInput } from "@fullcalendar/core";
import { extractTime } from "./helper";

type OpeningHoursEditorEventContentProps = {
  eventInput: EventInput;
};

const OpeningHoursEditorEventContent: React.FC<
  OpeningHoursEditorEventContentProps
> = ({ eventInput }) => {
  const { event } = eventInput;
  const { repetition } = event.extendedProps;
  const isSeries = repetition?.type === "weekly";

  return (
    <div
      className="opening-hours-editor-event-content"
      data-cy="opening-hours-editor-event-content"
    >
      <div>
        <b>{event.title}</b>
        <div>
          {extractTime(event.start)} - {extractTime(event.end)}
        </div>
      </div>
      {isSeries && (
        <div className="opening-hours-editor-event-content__series-icon">
          <img src={logo} alt="" className="" />
        </div>
      )}
    </div>
  );
};

export default OpeningHoursEditorEventContent;
