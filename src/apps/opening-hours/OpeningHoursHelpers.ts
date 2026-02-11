import { DplOpeningHoursListGET200Item as OpeningHoursItem } from "../../core/dpl-cms/model";
import { convertToDayJs, isSameDay } from "../../core/utils/helpers/date";

export type GroupedOpeningHours = Array<{
  dateTime: Date;
  openingHourEntries: OpeningHoursItem[];
}>;

export const groupOpeningHoursByWeekday = (
  startDate: Date,
  endDate: Date,
  openingHours: OpeningHoursItem[]
): GroupedOpeningHours => {
  const startDay = convertToDayJs(startDate);
  const endDay = convertToDayJs(endDate);
  let currentDay = startDay;

  // Generate array of days between start and end dates
  const allDays = [];

  while (!currentDay.isAfter(endDay)) {
    allDays.push(currentDay.toDate());
    currentDay = currentDay.add(1, "day");
  }

  const daysWithOpeningHours: GroupedOpeningHours = allDays.map((day) => {
    return {
      dateTime: day,
      openingHourEntries: openingHours
        .filter((individualOpeningHour) =>
          isSameDay(individualOpeningHour.date, day)
        )
        .sort((a, b) => {
          // The array is primarily sorted by the start_time property of each object.
          const startTimeComparison = a.start_time.localeCompare(b.start_time);
          if (startTimeComparison !== 0) {
            return startTimeComparison;
          }
          // If two objects have the same start_time, they are then sorted by the end_time property.
          return a.end_time.localeCompare(b.end_time);
        })
    };
  });

  return daysWithOpeningHours;
};
