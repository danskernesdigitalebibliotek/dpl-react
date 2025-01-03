import dayjs from "dayjs";
import dates from "../../../core/configuration/date-format.json";
import identifierLengths from "../../../core/configuration/identifier-lengths.json";

export const yesterday = dayjs()
  .subtract(1, "day")
  .format(dates.dateFormatDayjs);
export const soon = dayjs().add(7, "days").format(dates.dateFormatDayjs);
export const longer = dayjs().add(1, "year").format(dates.dateFormatDayjs);

export const getReservationType = (reservationId: string) => {
  if (reservationId.length === identifierLengths.faustIdentifierLength) {
    return "physical";
  }
  if (
    reservationId.length === identifierLengths.digitalMaterialIdentifierLength
  ) {
    return "digital";
  }
  return "invalid input";
};

const determineId = (string: string, regex: RegExp) => {
  const idFound = string ? string.toString().match(regex) : null;
  const returnValue = idFound && idFound.length > 0 ? idFound[0] : null;
  return returnValue;
};

export const isFaust = (input: string) => {
  // regex for determining whether a string is a faust
  const regex = /^\d{8}$/;
  return determineId(input, regex);
};

export const isIdentifier = (input: string) => {
  // regex for determining whether a string is an identifier
  const regex = /^\d{13}$/;
  return determineId(input, regex);
};
