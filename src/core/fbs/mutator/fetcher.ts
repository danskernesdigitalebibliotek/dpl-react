import { getToken, TOKEN_LIBRARY_KEY, TOKEN_USER_KEY } from "../../token";

const baseURL = "https://fbs-openplatform.dbc.dk"; // use your own URL here or environment variable

type FetchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

/**
 * Build URLSearchParams instance with support for arrays of values.
 *
 * By default, URLSearchParams will join arrays of values with a comma. This is
 * not desirable for our use case. Instead, we want arrays of values to be
 * represented as multiple entries with the same key.
 */
function buildParams(data: FetchParams) {
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
}

export const fetcher = async <ResponseType>({
  url,
  method,
  headers,
  params,
  data
}: {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch" | "head";
  headers?: object;
  params?: unknown;
  data?: BodyType<unknown>;
  signal?: AbortSignal;
}) => {
  const token = getToken(TOKEN_USER_KEY) ?? getToken(TOKEN_LIBRARY_KEY);
  const authHeaders = token
    ? ({ Authorization: `Bearer ${token}` } as object)
    : {};

  const body = data ? JSON.stringify(data) : null;

  const response = await fetch(
    `${baseURL}${url}${params ? `?${buildParams(params as FetchParams)}` : ""}`,
    {
      method,
      headers: {
        ...headers,
        ...authHeaders
      },
      body
    }
  );

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  try {
    return (await response.json()) as ResponseType;
  } catch (e) {
    if (!(e instanceof SyntaxError)) {
      throw e;
    }
  }

  // Do nothing. Some of our responses are intentionally empty and thus
  // cannot be converted to JSON. Fetch API and TypeScript has no clean
  // way for us to identify empty responses, so instead we swallow
  // syntax errors during decoding.
  return null;
};

export default fetcher;

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData;
