import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import da from "@fullcalendar/core/locales/da";
import { DateSelectArg, EventClickArg, EventInput } from "@fullcalendar/core";
import { useDplOpeningHoursListGET } from "../../core/dpl-cms/dpl-cms";
import { createCmsEventId, formatCmsEventsToFullCalendar } from "./helper";
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

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // Todo: Replace prompt with a modal
    // eslint-disable-next-line no-alert
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    if (title) {
      // Checks if the selected end date is different from the start day; if so, sets the end date to be the same as the start day and the end time to 00:00:00
      const startDay = new Date(selectInfo.startStr);
      let endDay = new Date(selectInfo.endStr);

      if (
        endDay.getDate() !== startDay.getDate() ||
        endDay.getMonth() !== startDay.getMonth() ||
        endDay.getFullYear() !== startDay.getFullYear()
      ) {
        endDay = new Date(startDay);
        // Adds one day to the end day and sets the time to 00:00:00ß
        endDay.setDate(endDay.getDate() + 1);
        endDay.setHours(0, 0, 0);
      }

      setEvents([
        ...events,
        {
          title,
          start: startDay.toISOString(),
          end: endDay.toISOString(),
          allDay: selectInfo.allDay,
          color: "green",
          id: createCmsEventId(title, startDay)
        }
      ]);
    }

    // clear date selection
    calendarApi.unselect();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    // eslint-disable-next-line no-alert
    const newTitle = prompt(
      "Enter a new title for this event",
      clickInfo.event.title
    );

    if (newTitle) {
      clickInfo.event.setProp("title", newTitle);
    }
  };

  const handleEventRemove = (eventToRemove: EventInput) => {
    setEvents(events.filter((event) => event.id !== eventToRemove.id));
  };

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
      select={handleDateSelect}
      eventClick={handleEventClick}
      events={events}
      eventContent={(eventInput) =>
        renderOpeningHoursEditorEventContent({
          eventInput,
          handleEventRemove
        })
      }
      stickyHeaderDates
      height="auto"
    />
  );
};

export default OpeningHoursEditor;
