/**
 * The 'getWayfinder` function sends an HTTP GET request to the Wayfinder API to get position data (holdings).
 *
 * @param {HoldingDataInterface} holdingsIds - An object containing the parameters for the request.
 */

import lodash from "lodash";
import querystring from "querystring";
import HttpError from "../../core/utils/errors/HttpError";
import {
  HoldingDataInterface,
  WayfinderReaponse
} from "../wayfinder/wayfinder-types";
import {
  getServiceBaseUrl,
  serviceUrlKeys
} from "../../core/utils/reduxMiddleware/extractServiceBaseUrls";

interface HttpErrorResponse {
  message: string;
}

export const wayfinder = getServiceBaseUrl(serviceUrlKeys.wayfinder);

const getWayfinder = async (
  holdingsIds: HoldingDataInterface
): Promise<WayfinderReaponse | null> => {
  const result = lodash.omitBy(
    holdingsIds,
    (value) => value === undefined || value === null
  );

  const queryStringUrl = querystring.stringify(result);
  try {
    const response = await fetch(`${wayfinder}/includes?${queryStringUrl}`, {
      method: "GET"
    });

    const jsonBody: WayfinderReaponse | HttpErrorResponse =
      await response.json();

    if (response.status !== 200) {
      if (response.status !== 404) {
        if ("message" in jsonBody) {
          /* eslint-disable */
          console.error(
            "Can't get data from wayfinder",
            new HttpError(
              response.status,
              jsonBody.message,
              `${wayfinder}/includes?${queryStringUrl}`
            )
          );
          /* eslint-enable */
        }
      }

      return null;
    }

    return jsonBody as WayfinderReaponse;
  } catch (error: unknown) {
    // eslint-disable-next-line
    console.error("Wayfinder error", error);
  }

  return null;
};

export default getWayfinder;
