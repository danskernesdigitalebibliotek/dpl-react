import { useState, useEffect } from "react";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import {
  createCmsEventId,
  formatCmsEventsToFullCalendar,
  isSameDay
} from "./helper";
import { DplOpeningHoursListGET200Item } from "../../core/dpl-cms/model";

const useOpeningHours = (
  initialData: DplOpeningHoursListGET200Item[] | null | undefined
) => {
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    if (initialData) {
      const formattedEvents = formatCmsEventsToFullCalendar(initialData);
      setEvents(formattedEvents);
    }
  }, [initialData]);

  const handleEventSelect = (selectInfo: DateSelectArg) => {
    // Todo: Replace prompt with a modal
    // eslint-disable-next-line no-alert
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    if (title) {
      // Checks if the selected end date is different from the start day; if so, sets the end date to be the same as the start day and the end time to 00:00:00
      const startDay = new Date(selectInfo.startStr);
      let endDay = new Date(selectInfo.endStr);

      if (!isSameDay(startDay, endDay)) {
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

  return {
    events,
    handleEventSelect,
    handleEventClick,
    handleEventRemove
  };
};

export default useOpeningHours;
