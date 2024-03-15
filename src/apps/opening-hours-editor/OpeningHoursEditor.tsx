import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import da from "@fullcalendar/core/locales/da";
import { useDplOpeningHoursListGET } from "../../core/dpl-cms/dpl-cms";
import OpeningHoursEditorEventContent from "./OpeningHoursEditorEventContent";
import useOpeningHours from "./useOpeningHours";

const OpeningHoursEditor: React.FC = () => {
  const { data: openingHoursData } = useDplOpeningHoursListGET();
  const { events, handleEventSelect, handleEventClick, handleEventRemove } =
    useOpeningHours(openingHoursData);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "title",
        center: "prev,next today",
        right: "dayGridMonth,timeGridWeek"
      }}
      initialView="timeGridWeek"
      locale={da}
      selectable
      select={handleEventSelect}
      eventClick={handleEventClick}
      eventContent={(eventInput) =>
        OpeningHoursEditorEventContent({
          eventInput,
          handleEventRemove
        })
      }
      events={events}
      stickyHeaderDates
      height="auto"
      selectMirror
    />
  );
};

export default OpeningHoursEditor;
