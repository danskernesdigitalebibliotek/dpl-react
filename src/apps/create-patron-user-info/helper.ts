import { appendQueryParametersToUrl } from "../../core/utils/helpers/url";

export const getRedirectUrl = ({
  loginUrl,
  logoutUrl,
  redirectOnUserCreatedUrl
}: {
  loginUrl: URL;
  logoutUrl: URL;
  redirectOnUserCreatedUrl: URL;
}) => {
  const loginUrlWithRedirect = appendQueryParametersToUrl(loginUrl, {
    "current-path": `${redirectOnUserCreatedUrl.pathname}${redirectOnUserCreatedUrl.search}`
  });
  const logoutUrlWithRedirect = appendQueryParametersToUrl(logoutUrl, {
    "current-path": `${loginUrlWithRedirect.pathname}${loginUrlWithRedirect.search}`
  });

  return logoutUrlWithRedirect;
};

export default {};

// ************** VITEST ***************
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("getRedirectUrl", () => {
    it("should be able to create a redirect url combining three urls", () => {
      const domain = "https://dpl-cms.com";
      const loginUrl = new URL(`${domain}/login`);
      const logoutUrl = new URL(`${domain}/logout`);
      const redirectOnUserCreatedUrl = new URL(`${domain}/velkommen`);
      const redirectUrl = getRedirectUrl({
        loginUrl,
        logoutUrl,
        redirectOnUserCreatedUrl
      });

      expect(String(redirectUrl)).toEqual(
        "https://dpl-cms.com/logout?current-path=%2Flogin%3Fcurrent-path%3D%25252Fvelkommen"
      );
    });
  });
}
