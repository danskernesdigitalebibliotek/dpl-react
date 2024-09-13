import dayjs from "dayjs";
import dateFormats from "../../../core/configuration/date-format.json";
import identifiers from "../../../core/configuration/identifier-lengths.json";

const { faustIdentifierLength, digitalMaterialIdentifierLength } = identifiers;
const { dateFormatDayjs } = dateFormats;

export const yesterday = dayjs().subtract(1, "day").format(dateFormatDayjs);
export const soon = dayjs().add(7, "days").format(dateFormatDayjs);
export const longer = dayjs().add(1, "year").format(dateFormatDayjs);

export const getReservationType = (reservationId: string) => {
  if (reservationId.length === faustIdentifierLength) {
    return "physical";
  }
  if (reservationId.length === digitalMaterialIdentifierLength) {
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
