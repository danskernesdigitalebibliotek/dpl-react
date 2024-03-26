import {
  eachDayOfInterval,
  endOfWeek,
  format,
  getWeek,
  getYear,
  startOfWeek
} from "date-fns";
import { da } from "date-fns/locale";
import { DplOpeningHoursListGET200Item as OpeningHoursItem } from "../../core/dpl-cms/model";

export const getCurrentWeekDisplay = (date: Date): string => {
  const week = getWeek(date, { locale: da });
  const year = getYear(date);

  return `Uge ${week}, ${year}`;
};
export const formatDateToWeekdayName = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "EEEE", { locale: da });
};

export const formatDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd", { locale: da });
};
export const getWeekStartAndEndDate = (date = new Date()) => {
  const start = startOfWeek(date, { weekStartsOn: 1, locale: da });
  const end = endOfWeek(date, { weekStartsOn: 1, locale: da });

  // Logging the start and end of the week for verification
  console.log(
    "Start of week:",
    formatDateToWeekdayName(start.toString()),
    formatDate(start)
  );
  console.log(
    "End of week:",
    formatDateToWeekdayName(end.toString()),
    formatDate(end)
  );

  return { start, end };
};

export const formatDayAndDate = (dateStr: string) => {
  const dateObj = new Date(dateStr);
  const dayName = dateObj.toLocaleDateString("da-DK", { weekday: "long" });
  const formattedDate = dateObj.toISOString().split("T")[0];
  return `${dayName}: ${formattedDate}`;
};

export interface GroupedOpeningHours {
  [day: string]: {
    date: string;
    openingHours: OpeningHoursItem[];
  };
}
/**
 * Groups opening hours by the day of the week.
 * @param date A date within the target week.
 * @param openingHours Array of opening hours items to be grouped.
 * @returns An object with weekdays as keys and arrays of OpeningHoursItem as values.
 */

export const groupOpeningHoursByWeekday = (
  date: Date,
  openingHours: OpeningHoursItem[]
): GroupedOpeningHours => {
  const { start, end } = getWeekStartAndEndDate(date);
  const days = eachDayOfInterval({ start, end });
  const grouped: GroupedOpeningHours = {};

  // Pre-populate the grouped object with all days of the week
  days.forEach((day) => {
    const weekdayName = formatDateToWeekdayName(day);
    grouped[weekdayName] = {
      date: formatDate(day),
      openingHours: []
    };
  });

  // Group the opening hours by their respective days
  openingHours.forEach((hour) => {
    const dayOfWeek = formatDateToWeekdayName(new Date(hour.date));
    grouped[dayOfWeek].openingHours.push(hour);
  });

  return grouped;
};
