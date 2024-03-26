import { useState, useEffect } from "react";
import { EventInput, DateSelectArg } from "@fullcalendar/core";
import { EventImpl } from "@fullcalendar/core/internal";
import { createCmsEventId, formatCmsEventsToFullCalendar } from "./helper";
import { useDplOpeningHoursListGET } from "../../core/dpl-cms/dpl-cms";

export type ExtendedDateSelectArgType = DateSelectArg & { title: string };

const useOpeningHours = () => {
  const { data: openingHoursData } = useDplOpeningHoursListGET();
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    if (openingHoursData) {
      const formattedEvents = formatCmsEventsToFullCalendar(openingHoursData);
      setEvents(formattedEvents);
    }
  }, [openingHoursData]);

  const handleEventSelect = (selectInfo: ExtendedDateSelectArgType) => {
    // This is just for demonstration purposes
    // and should be replaced with a call to the API
    const newEvent = {
      title: selectInfo.title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
      color: "green",
      id: createCmsEventId(selectInfo.title, selectInfo.start)
    };
    setEvents([...events, newEvent]);

    // eslint-disable-next-line no-alert
    alert(JSON.stringify(newEvent, null, 2));
  };

  const handleEventEditing = (eventInfo: EventImpl) => {
    // This is just for demonstration purposes
    // and should be replaced with a call to the API
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(eventInfo, null, 2));
  };

  const handleEventRemove = (eventToRemove: EventImpl) => {
    setEvents(events.filter((event) => event.id !== eventToRemove.id));
  };

  return {
    events,
    handleEventSelect,
    handleEventRemove,
    handleEventEditing
  };
};

export default useOpeningHours;
