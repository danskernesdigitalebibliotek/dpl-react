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
