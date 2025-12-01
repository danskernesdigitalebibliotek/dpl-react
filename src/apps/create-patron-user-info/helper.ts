import { UseTextFunction } from "../../core/utils/text";
import { appendQueryParametersToUrl } from "../../core/utils/helpers/url";

export const getSubmitButtonText = (
  t: UseTextFunction,
  isLoading: boolean,
  isSubmitError: boolean
) => {
  if (isLoading) {
    return t("createPatronButtonLoadingText");
  }
  if (isSubmitError) {
    return t("createPatronButtonErrorText");
  }
  return t("createPatronConfirmButtonText");
};

export const getRedirectUrl = ({
  loginUrl,
  logoutUrl,
  redirectOnUserCreatedUrl
}: {
  loginUrl: URL;
  logoutUrl: URL;
  redirectOnUserCreatedUrl: URL;
}) =>
  appendQueryParametersToUrl(logoutUrl, {
    "current-path": `${loginUrl.pathname}?current-path=${redirectOnUserCreatedUrl.pathname}`
  });

export default {};

// ************** VITEST ***************
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("getRedirectUrl", () => {
    it("should be able to create a redirect url combining three urls", () => {
      const domain = "http://some-domain.com";

      const loginUrl = new URL(`${domain}/login`);
      const logoutUrl = new URL(`${domain}/logout`);
      const redirectOnUserCreatedUrl = new URL(`${domain}/velkommen`);
      const redirectUrl = getRedirectUrl({
        loginUrl,
        logoutUrl,
        redirectOnUserCreatedUrl
      });

      expect(String(redirectUrl)).toEqual(
        "http://some-domain.com/logout?current-path=%2Flogin%3Fcurrent-path%3D%2Fvelkommen"
      );
    });
  });
}

export const calculateDistanceBetweenTwoCoordinates = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  // Haversine formula
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
