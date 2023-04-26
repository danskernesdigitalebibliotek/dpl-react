import { isEmpty } from "lodash";
import { AuthenticatedPatronV6 } from "../../fbs/model";
import { hasToken } from "../../token";

export const isAnonymous = () => {
  return !hasToken("user");
};

export const isBlocked = (
  userData: AuthenticatedPatronV6 | null | undefined
) => {
  if (!userData) return false;
  return !isEmpty(userData.patron?.blockStatus);
};

export const userIsAllowed = (
  userData: AuthenticatedPatronV6 | null | undefined
) => {
  if (!userData) return false;
  return isEmpty(userData.patron?.blockStatus);
};

export default {};
