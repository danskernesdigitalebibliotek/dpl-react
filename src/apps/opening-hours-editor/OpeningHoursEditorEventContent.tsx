import React from "react";
import logo from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/logo/reload_logo_black.svg";
import { EventInput } from "@fullcalendar/core";
import { isOpeningHourWeeklyRepetition } from "./helper";
import { extractTime } from "../../core/utils/helpers/date";

type OpeningHoursEditorEventContentProps = {
  eventInput: EventInput;
  iconAltText: string;
};

const OpeningHoursEditorEventContent: React.FC<
  OpeningHoursEditorEventContentProps
> = ({ eventInput, iconAltText }) => {
  const { event } = eventInput;

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
      {isOpeningHourWeeklyRepetition(event) && (
        <div className="opening-hours-editor-event-content__series-icon">
          <img src={logo} alt={iconAltText} />
        </div>
      )}
    </div>
  );
};

export default OpeningHoursEditorEventContent;
