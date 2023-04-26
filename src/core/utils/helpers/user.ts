import { isEmpty } from "lodash";
import { Patron } from "../types/entities";
import { hasToken } from "../../token";

export const isAnonymous = () => {
  return !hasToken("user");
};

export const isBlocked = (patron: Patron) => {
  return !isEmpty(patron.blockStatus);
};

export const canReserve = (patron: Patron) => {
  return isEmpty(patron.blockStatus);
};

export default {};
