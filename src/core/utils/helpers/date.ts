import { upperFirst } from "lodash";
import dayjs from "dayjs";
import "dayjs/locale/da";
import weekOfYear from "dayjs/plugin/weekOfYear";
import utc from "dayjs/plugin/utc";
import {
  dateFormatCustom,
  dateFormatDash,
  dateFormatDashWithTime,
  dateFormatDayjs,
  dateFormatIso,
  dateFormatSlashDayMonth,
  dateFormatWeekday,
  dateFormatWeekdayMonth,
  timeFormat
} from "../../configuration/date-format";

dayjs.locale("da");
dayjs.extend(weekOfYear);
dayjs.extend(utc);

const getCurrentUnixTime = () => Math.floor(Date.now() / 1000);

export const convertToDayJs = (date: string | Date) => {
  return dayjs(date);
};

export const getUnixTimestamp = (date: string) => {
  return dayjs(date).valueOf();
};

// Date comparison functions
export const isSameDay = (date1: string | Date, date2: string | Date) => {
  return dayjs(date1).isSame(date2, "day");
};

export const dateHasPassed = (date: string) => {
  return dayjs().isAfter(date, "day");
};

export const calculateDateDayDifference = (
  startDate: string,
  endDate: string
) => {
  return dayjs(startDate).diff(dayjs(endDate), "day");
};

export const calculateDateYearsDifference = (date: string | Date) => {
  return dayjs().diff(dayjs(date), "year");
};

export const calculateRoundedUpDaysUntil = (date: string) => {
  const inputDate = dayjs(new Date(date));
  const today = dayjs(new Date());

  // Math.ceil 0 diff last param true is because "diff()" rounds the number down
  // and we need it to be rounded up
  // todo figure out if ceil is correct (talk to ddb)
  return Math.ceil(inputDate.diff(today, "day", true));
};

export const calculateRoundedUpDaysDifference = (
  startDate: string,
  endDate: string
) => {
  const inputFirstDate = dayjs(new Date(startDate));
  const inputSecondDate = dayjs(new Date(endDate));

  // Math.ceil 0 diff last param true is because "diff()" rounds the number down
  // and we need it to be rounded up
  // todo figure out if ceil is correct (talk to ddb)
  return Math.ceil(inputFirstDate.diff(inputSecondDate, "day", true));
};

// Date formatting functions
export const toDayString = (): string => {
  return dayjs().format(dateFormatWeekdayMonth);
};

export const formatDate = (date: string | Date) => {
  return dayjs(date).format(dateFormatDash);
};

export const formatDateTime = (date: string) => {
  return dayjs(date).format(dateFormatDashWithTime);
};

export const formatDateTimeUtc = (date: string) => {
  return dayjs(date).utc().format(dateFormatDashWithTime);
};

export const formatDayMonth = (date: string | Date) => {
  return dayjs(date).format(dateFormatSlashDayMonth);
};

export const formatWeekday = (date: string | Date) => {
  return dayjs(date).format(dateFormatWeekday);
};

export const formatDateForAPI = (date: Date): string => {
  return dayjs(date).format(dateFormatDayjs);
};

export const formatDateStringISO = (date: Date) => {
  return dayjs(date).format(dateFormatIso);
};

export const formatCustomDateString = (dateString: string) =>
  dayjs(dateString).format(dateFormatCustom);

export const formatDateDependingOnDigitalMaterial = ({
  date,
  isDigital
}: {
  date: string;
  isDigital: boolean;
}) => {
  return isDigital ? formatDateTimeUtc(date) : formatDate(date);
};

// Date calculation functions: Get dates relative to today
export const getMonthAgoDate = () =>
  dayjs().subtract(1, "month").format(dateFormatDayjs);

export const getYesterdayDate = () =>
  dayjs().subtract(1, "day").format(dateFormatDayjs);

export const getTodayDate = () => dayjs().format(dateFormatDayjs);

export const getNextWeekDate = () =>
  dayjs().add(7, "days").format(dateFormatDayjs);

export const getNextYearDate = () =>
  dayjs().add(1, "year").format(dateFormatDayjs);

export const getPreviousWeek = (date: Date): Date => {
  return dayjs(date).subtract(1, "week").toDate();
};

export const getWeek = (date: Date): string => {
  return dayjs(date).week().toString();
};

export const getNextWeek = (date: Date): Date => {
  return dayjs(date).add(1, "week").toDate();
};

export const getYear = (date: Date): string => {
  return dayjs(date).year().toString();
};

export const getWeekStartAndEndDate = (date = new Date()) => {
  const start = dayjs(date).startOf("week").toDate();
  const end = dayjs(date).endOf("week").toDate();

  return { start, end };
};

export const formatWeekString = (
  translationKey: string,
  date: Date
): string => {
  const week = getWeek(date);
  const year = getYear(date);

  return `${translationKey} ${week}, ${year}`;
};

export const formatDateToWeekday = (date: Date): string => {
  const formattedAsWeekday = formatWeekday(date);
  const capitalizedWeekday = upperFirst(formattedAsWeekday);

  return capitalizedWeekday;
};

// Date calculation functions: Get future dates
export const getFutureDateString = (num: number) => {
  const futureDate = dayjs().add(num, "day").format(dateFormatDayjs);
  return futureDate;
};

export const getFutureDateStringISO = (num: number) => {
  const futureDate = dayjs().add(num, "day").format(dateFormatIso);
  return futureDate;
};

export const extractTime = (date: Date) => {
  return dayjs(date).format(timeFormat);
};

export const updateDateTime = (date: Date, timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return dayjs(date).hour(hours).minute(minutes).toDate();
};

export default getCurrentUnixTime;
