import { useState, useEffect } from "react";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import {
  createCmsEventId,
  formatCmsEventsToFullCalendar,
  adjustEndDateToStartDay
} from "./helper";
import { useDplOpeningHoursListGET } from "../../core/dpl-cms/dpl-cms";

const useOpeningHours = () => {
  const { data: openingHoursData } = useDplOpeningHoursListGET();
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    if (openingHoursData) {
      const formattedEvents = formatCmsEventsToFullCalendar(openingHoursData);
      setEvents(formattedEvents);
    }
  }, [openingHoursData]);

  const handleEventSelect = (selectInfo: DateSelectArg) => {
    // Todo: Replace prompt with a modal
    // eslint-disable-next-line no-alert
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    if (title) {
      // Checks if the selected end date is different from the start day; if so, sets the end date to be the same as the start day and the end time to 00:00:00
      const startDay = new Date(selectInfo.startStr);
      let endDay = new Date(selectInfo.endStr);

      endDay = adjustEndDateToStartDay(startDay, endDay);

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

  return {
    events,
    handleEventSelect,
    handleEventClick,
    handleEventRemove
  };
};

export default useOpeningHours;
