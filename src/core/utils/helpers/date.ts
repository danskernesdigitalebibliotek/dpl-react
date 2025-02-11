import dayjs from "dayjs";
import "dayjs/locale/da";
import {
  dateFormatCustom,
  dateFormatDayjs
} from "../../configuration/date-format";

const getCurrentUnixTime = () => Math.floor(Date.now() / 1000);

export const dateHasPassed = (date: string) => {
  return dayjs().isAfter(date, "day");
};

export const formatDate = (date: string) => {
  return dayjs(date).format("DD-MM-YYYY");
};
export const formatDateTime = (date: string) => {
  return dayjs(date).format("DD-MM-YYYY HH:mm");
};

export const formatDateDependingOnDigitalMaterial = ({
  date,
  isDigital
}: {
  date: string;
  isDigital: boolean;
}) => {
  return isDigital ? formatDateTime(date) : formatDate(date);
};

export const getYesterdayDate = () =>
  dayjs().subtract(1, "day").format(dateFormatDayjs);

export const getNextWeekDate = () =>
  dayjs().add(7, "days").format(dateFormatDayjs);

export const getNextYearDate = () =>
  dayjs().add(1, "year").format(dateFormatDayjs);

export const formatCustomDateString = (dateString: string) =>
  dayjs(dateString).format(dateFormatCustom);

export default getCurrentUnixTime;
