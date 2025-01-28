import dayjs from "dayjs";
import "dayjs/locale/da";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { upperFirst } from "lodash";
import { DplOpeningHoursListGET200Item as OpeningHoursItem } from "../../core/dpl-cms/model";

dayjs.locale("da");
dayjs.extend(weekOfYear);

export const getNextWeek = (date: Date): Date => {
  return dayjs(date).add(1, "week").toDate();
};

export const getPreviousWeek = (date: Date): Date => {
  return dayjs(date).subtract(1, "week").toDate();
};

export const getWeek = (date: Date): string => {
  return dayjs(date).week().toString();
};

export const getYear = (date: Date): string => {
  return dayjs(date).year().toString();
};

export const formatWeekString = (
  translationKey: string,
  date: Date
): string => {
  const week = getWeek(date);
  const year = getYear(date);

  return `${translationKey} ${week}, ${year}`;
};

const capitalizeString = (string: string): string => {
  return upperFirst(string);
};

export const formatDateToWeekday = (date: Date): string => {
  const formattedAsWeekday = dayjs(date).format("dddd");
  const capitalizedWeekday = capitalizeString(formattedAsWeekday);

  return capitalizedWeekday;
};

export const formatDateForAPI = (date: Date): string => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const getWeekStartAndEndDate = (date = new Date()) => {
  const start = dayjs(date).startOf("week").toDate();
  const end = dayjs(date).endOf("week").toDate();

  return { start, end };
};

export type GroupedOpeningHours = Array<{
  dateTime: Date;
  openingHourEntries: OpeningHoursItem[];
}>;

export const groupOpeningHoursByWeekday = (
  startDate: Date,
  endDate: Date,
  openingHours: OpeningHoursItem[]
): GroupedOpeningHours => {
  const startDay = dayjs(startDate);
  const endDay = dayjs(endDate);
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
          dayjs(individualOpeningHour.date).isSame(day, "day")
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
