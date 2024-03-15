import { DplOpeningHoursListGET200Item } from "../../core/dpl-cms/model";

const formatDateTimeString = (date: string, time: string): string => {
  return `${date}T${time}:00`;
};

export const createCmsEventId = (title: string, startDay: Date) => {
  return `${title}-${startDay.toISOString()}`;
};

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

export const isSameDay = (startDay: Date, endDay: Date) => {
  return startDay.toDateString() === endDay.toDateString();
};
