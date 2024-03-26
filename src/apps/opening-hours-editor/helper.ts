import { EventInput } from "@fullcalendar/core";
import { DplOpeningHoursListGET200Item } from "../../core/dpl-cms/model";

const formatDateTimeString = (date: string, time: string): string => {
  return `${date}T${time}:00`;
};

export const formatCmsEventsToFullCalendar = (
  data: DplOpeningHoursListGET200Item[]
): EventInput[] => {
  return data.map(({ category, date, start_time, end_time, id }) => {
    return {
      id: id.toString(),
      title: category.title,
      start: formatDateTimeString(date, start_time),
      end: formatDateTimeString(date, end_time),
      color: category.color
    };
  });
};

export const formatFullCalendarEventToCmsEvent = (
  event: EventInput
): DplOpeningHoursListGET200Item => {
  if (!event.title) {
    throw new Error("Invalid event format");
  }
  return {
    id: Number(event.id),
    category: {
      title: event.title,
      color: event.color || ""
    },
    date: event.startStr.split("T")[0],
    start_time: event.startStr.split("T")[1].slice(0, 5),
    end_time: event.endStr.split("T")[1].slice(0, 5),
    branch_id: 0
  };
};

export const adjustEndDateToStartDay = (startDay: Date, endDay: Date) => {
  // If startDay and endDay are the same, no adjustment needed
  if (startDay.toDateString() === endDay.toDateString()) {
    return endDay;
  }

  // If startDay and endDay are different, create a new date as adjustedEndDay
  // Set it to startDay, but with the day advanced by one and the time reset to midnight
  const adjustedEndDay = new Date(startDay);
  adjustedEndDay.setDate(adjustedEndDay.getDate() + 1);
  adjustedEndDay.setHours(0, 0, 0);
  return adjustedEndDay;
};

export const extractTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const updateEventTime = (date: Date, timeStr: string) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  date.setHours(hours, minutes);
  return date;
};
