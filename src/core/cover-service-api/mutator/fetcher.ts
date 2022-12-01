import { getToken, TOKEN_LIBRARY_KEY } from "../../token";
import getFetcherUrl, { configTypes } from "../../utils/helpers/fetcher";

const defaultBaseUrl = "https://cover.dandigbib.org"; // use your own URL here or environment variable

type FetchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export const fetcher = async <ResponseType>({
  url,
  method,
  params,
  data
}: {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch" | "head";
  params?: unknown;
  data?: BodyType<unknown>;
  signal?: AbortSignal;
}) => {
  const baseUrlFromConfig = getFetcherUrl(configTypes.cover);
  const baseURL = baseUrlFromConfig || defaultBaseUrl;

  const additionalHeaders =
    data?.headers === "object" ? (data?.headers as unknown as object) : {};

  const libraryToken = getToken(TOKEN_LIBRARY_KEY);
  const authHeaders = libraryToken
    ? ({ Authorization: `Bearer ${libraryToken}` } as object)
    : {};

  const headers = {
    ...authHeaders,
    ...additionalHeaders
  };
  const body = data ? JSON.stringify(data) : null;

  const urlParams = params
    ? `?${new URLSearchParams(params as FetchParams)}`
    : "";

  const response = await fetch(`${baseURL}${url}${urlParams}`, {
    method,
    headers,
    body
  });

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
  // way for us to identify empty responses so instead we swallow
  // syntax errors during decoding.
  return null;
};

export default fetcher;

export type ErrorType<ErrorData> = ErrorData & { status: number };

export type BodyType<BodyData> = BodyData & { headers?: unknown };
