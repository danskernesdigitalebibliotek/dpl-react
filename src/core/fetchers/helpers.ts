import { FetchParams, RequestOptions } from "./types";

/**
 * Build URLSearchParams instance with support for arrays of values.
 *
 * By default, URLSearchParams will join arrays of values with a comma. This is
 * not desirable for our use case. Instead, we want arrays of values to be
 * represented as multiple entries with the same key.
 */
export const buildParams = (data: FetchParams) => {
  let params: URLSearchParams;

  if (typeof data === "string" || data === undefined) {
    params = new URLSearchParams(data);
  } else {
    params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((inner) => {
          params.append(key, inner.toString());
        });
      } else {
        params.append(key, value.toString());
      }
    });
  }

  return params;
};

export const getServiceUrlWithParams = ({
  baseUrl,
  url,
  params
}: {
  baseUrl: string;
  url: string;
  params: unknown;
}) => {
  const urlParams = params ? `?${buildParams(params as FetchParams)}` : "";
  return `${baseUrl}${url}${urlParams}`;
};

export const createAuthHeader = (
  token: RequestOptions["bearerToken"]
): { Authorization: `Bearer ${string}` } | Record<string, never> =>
  token
    ? {
        Authorization: `Bearer ${token}`
      }
    : {};

export const getServiceUrlWithParams = ({
  baseUrl,
  url,
  params
}: {
  baseUrl: string;
  url: string;
  params: unknown;
}) => {
  const urlParams = params ? `?${buildParams(params as FetchParams)}` : "";
  return `${baseUrl}${url}${urlParams}`;
};

export default {};
