import { isEmpty } from "lodash";
import { Patron } from "../types/entities";

import {
  getToken,
  TOKEN_UNREGISTERED_USER_KEY,
  TOKEN_USER_KEY,
  hasToken
} from "../../token";
import { UserInfoData } from "../../adgangsplatformen/useUserInfo";

export const isAnonymous = () => {
  return !hasToken("user");
};

export const isUnregistered = () => {
  return hasToken("unregistered-user");
};

export const isBlocked = (patron: Patron) => {
  return !isEmpty(patron.blockStatus);
};

export const isResident = (userData: UserInfoData, siteAgencyId: string) => {
  return userData.attributes.municipalityAgencyId === siteAgencyId;
};

export const getUserToken = () => {
  if (isUnregistered()) {
    return getToken(TOKEN_UNREGISTERED_USER_KEY);
  }
  if (!isAnonymous()) {
    return getToken(TOKEN_USER_KEY);
  }
  return null;
};

export default {};
