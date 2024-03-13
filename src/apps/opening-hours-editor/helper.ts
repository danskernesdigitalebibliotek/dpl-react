import { DateSelectArg, EventClickArg, EventInput } from "@fullcalendar/core";
import { DplOpeningHoursListGET200Item } from "../../core/dpl-cms/model";

function formatDateTimeString(date: string, time: string) {
  return `${date}T${time}:00`;
}

export function createCmsEventId(title: string, startDay: Date) {
  return `${title}-${startDay.toISOString()}`;
}

export const formatCmsEventsToFullCalendar = (
  data: DplOpeningHoursListGET200Item[]
) => {
  return data.map(({ category, date, start_time, end_time }) => {
    const startDateTime = new Date(formatDateTimeString(date, start_time));
    return {
      id: createCmsEventId(category.title, startDateTime),
      title: category.title,
      start: formatDateTimeString(date, start_time),
      end: formatDateTimeString(date, end_time),
      allDay: false,
      color: "blue"
    };
  });
};

//  handler functions for the calendar

interface HandleDateSelectParams {
  selectInfo: DateSelectArg;
  events: EventInput[];
  setEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
}

export const handleDateSelect = ({
  selectInfo,
  events,
  setEvents
}: HandleDateSelectParams) => {
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

export const handleEventClick = (clickInfo: EventClickArg) => {
  // eslint-disable-next-line no-alert
  const newTitle = prompt(
    "Enter a new title for this event",
    clickInfo.event.title
  );

  if (newTitle) {
    clickInfo.event.setProp("title", newTitle);
  }
};

export const handleEventRemove = (
  eventToRemove: EventInput,
  events: EventInput[],
  setEvents: React.Dispatch<React.SetStateAction<EventInput[]>>
) => {
  setEvents(events.filter((event) => event.id !== eventToRemove.id));
};
