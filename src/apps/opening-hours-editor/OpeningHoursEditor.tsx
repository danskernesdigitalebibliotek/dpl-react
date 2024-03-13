import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import da from "@fullcalendar/core/locales/da";
import { EventInput } from "@fullcalendar/core";
import { useDplOpeningHoursListGET } from "../../core/dpl-cms/dpl-cms";
import {
  formatCmsEventsToFullCalendar,
  handleDateSelect,
  handleEventClick,
  handleEventRemove
} from "./helper";
import renderOpeningHoursEditorEventContent from "./OpeningHoursEditorEventContent";

const OpeningHoursEditor: React.FC = () => {
  const { data: openingHoursData } = useDplOpeningHoursListGET();
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    if (openingHoursData) {
      const formattedEvents = formatCmsEventsToFullCalendar(openingHoursData);
      setEvents(formattedEvents);
    }
  }, [openingHoursData]);

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
      select={(selectInfo) =>
        handleDateSelect({ selectInfo, events, setEvents })
      }
      eventClick={(clickInfo) => handleEventClick(clickInfo)}
      eventContent={(eventInput) =>
        renderOpeningHoursEditorEventContent({
          eventInput,
          handleEventRemove: (eventToRemove) =>
            handleEventRemove(eventToRemove, events, setEvents)
        })
      }
      events={events}
      stickyHeaderDates
      height="auto"
    />
  );
};

export default OpeningHoursEditor;
