import { FetchParams, RequestOptions } from "./types";
import { store } from "../store";

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

export const createAuthHeader = (
  token: RequestOptions["bearerToken"]
): { Authorization: `Bearer ${string}` } | Record<string, never> =>
  token
    ? {
        Authorization: `Bearer ${token}`
      }
    : {};

// Creates a "by author, author and author"-string
// String interpolation todo?
export const getContributors = (creators: string[]) => {
  let returnContentString = "";

  // Todo this is sortof a hack, but using t: UseTextFunction as argument
  // makes the components re-render.
  const {
    text: { data: texts }
  } = store.getState();

  if (creators && creators.length > 0) {
    if (creators.length === 1) {
      returnContentString = `${texts.materialByAuthorText} ${creators.join(
        ", "
      )}`;
    } else {
      returnContentString = `${texts.materialByAuthorText} ${creators
        .slice(0, -1)
        .join(", ")} ${texts.materialAndAuthorText} ${creators.slice(-1)}`;
    }
  }
  return returnContentString;
};

export default {};
