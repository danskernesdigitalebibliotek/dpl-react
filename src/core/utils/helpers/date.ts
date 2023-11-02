import dayjs from "dayjs";

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

export default getCurrentUnixTime;
