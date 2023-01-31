import dayjs from "dayjs";

const getCurrentUnixTime = () => Math.floor(Date.now() / 1000);

export const dateHasPassed = (date: string) => {
  return dayjs().isAfter(date, "day");
};

export default getCurrentUnixTime;
