import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import da from "@fullcalendar/core/locales/da";
import { DateSelectArg, EventInput } from "@fullcalendar/core";

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<EventInput[]>([
    {
      title: "My Event",
      start: "2024-03-14T10:00:00",
      end: "2024-03-14T15:00:00",
      color: "blue"
    }
  ]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    if (title) {
      setEvents([
        ...events,
        {
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          color: "green"
        }
      ]);
    }

    // clear date selection
    calendarApi.unselect();
  };

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      locale={da}
      selectable
      select={handleDateSelect}
      events={events}
      height="100vh"
      stickyHeaderDates
    />
  );
};

export default Calendar;
