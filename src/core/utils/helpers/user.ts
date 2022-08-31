import { hasToken } from "../../token";

export const userIsAnonymous = () => {
  return !hasToken("user");
};
export default {};
