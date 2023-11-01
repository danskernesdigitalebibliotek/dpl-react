import { isEmpty } from "lodash";
import { Patron } from "../types/entities";
import { hasToken } from "../../token";
import { useGetPatronInformationByPatronIdV2 } from "../../fbs/fbs";

export const isAnonymous = () => {
  return !hasToken("user");
};

export const isBlocked = (patron: Patron) => {
  return !isEmpty(patron.blockStatus);
};

export const isResident = (patron: Patron) => {
  return patron.resident;
};

export const usePatronData = () =>
  useGetPatronInformationByPatronIdV2({
    enabled: !isAnonymous()
  });

export default {};
