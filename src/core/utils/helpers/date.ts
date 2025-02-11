import dayjs from "dayjs";
import "dayjs/locale/da";
import {
  dateFormatCustom,
  dateFormatDayjs
} from "../../configuration/date-format";

const getCurrentUnixTime = () => Math.floor(Date.now() / 1000);

// Date comparison functions
export const dateHasPassed = (date: string) => {
  return dayjs().isAfter(date, "day");
};

export const calculateDateDayDifference = (
  startDate: string,
  endDate: string
) => {
  return dayjs(startDate).diff(dayjs(endDate), "day");
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
export const formatDate = (date: string) => {
  return dayjs(date).format("DD-MM-YYYY");
};

export const formatDateTime = (date: string) => {
  return dayjs(date).format("DD-MM-YYYY HH:mm");
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
  return isDigital ? formatDateTime(date) : formatDate(date);
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

// Date calculation functions: Get future dates
export const getFutureDateString = (num: number) => {
  const futureDate = dayjs().add(num, "day").format(dateFormatDayjs);
  return futureDate;
};

export const getFutureDateStringISO = (num: number) => {
  const futureDate = dayjs().add(num, "day").format("YYYY-MM-DDTHH:mm:ssZ");
  return futureDate;
};

export default getCurrentUnixTime;
