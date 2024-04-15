import FetchFailedError from "../../fetchers/FetchFailedError";
import { FetchParams } from "../../fetchers/types";
import { getToken, TOKEN_LIBRARY_KEY } from "../../token";
import {
  getServiceBaseUrl,
  serviceUrlKeys
} from "../../utils/reduxMiddleware/extractServiceBaseUrls";
import CoverServiceHttpError from "./CoverServiceHttpError";

export const getServiceUrlWithParams = ({
  baseUrl,
  url,
  params
}: {
  baseUrl: string;
  url: string;
  params: unknown;
}) => {
  const urlParams = new URLSearchParams(params as FetchParams);
  return `${baseUrl}${url}?${urlParams}`;
};

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

  const serviceUrl = getServiceUrlWithParams({
    baseUrl: getServiceBaseUrl(serviceUrlKeys.cover),
    url,
    params
  });

  try {
    const response = await fetch(serviceUrl, {
      method,
      headers,
      body
    });

    if (!response.ok) {
      throw new CoverServiceHttpError(
        response.status,
        response.statusText,
        serviceUrl
      );
    }

    try {
      return (await response.json()) as ResponseType;
    } catch (e) {
      if (!(e instanceof SyntaxError)) {
        throw e;
      }
    }
  } catch (error: unknown) {
    if (error instanceof CoverServiceHttpError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new FetchFailedError(message, serviceUrl);
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
