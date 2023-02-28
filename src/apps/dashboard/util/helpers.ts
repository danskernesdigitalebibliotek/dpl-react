import dayjs from "dayjs";
import { dateFormatDayjs } from "../../../core/configuration/date-format.json";
import {
  faustIdentifierLength,
  digitalMaterialIdentifierLength
} from "../../../core/configuration/identifier-lengths.json";

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
