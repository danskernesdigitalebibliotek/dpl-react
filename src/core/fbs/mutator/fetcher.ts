import FetchFailedCriticalError from "../../fetchers/FetchFailedCriticalError";
import { getServiceUrlWithParams } from "../../fetchers/helpers";
import { getToken, TOKEN_LIBRARY_KEY } from "../../token";
import { getUserToken } from "../../utils/helpers/user";
import {
  getServiceBaseUrl,
  serviceUrlKeys
} from "../../utils/reduxMiddleware/extractServiceBaseUrls";
import FbsServiceHttpError from "./FbsServiceHttpError";

export const fetcher = async <ResponseType>({
  url,
  method,
  headers,
  params,
  data
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";
  headers?: object;
  params?: unknown;
  data?: BodyType<unknown>;
  signal?: AbortSignal;
}) => {
  const token = getUserToken() ?? getToken(TOKEN_LIBRARY_KEY);
  const baseUrl = getServiceBaseUrl(serviceUrlKeys.fbs);

  const authHeaders = token
    ? ({ Authorization: `Bearer ${token}` } as object)
    : {};

  const body = data ? JSON.stringify(data) : null;
  const serviceUrl = getServiceUrlWithParams({ baseUrl, url, params });

  try {
    const response = await fetch(serviceUrl, {
      method,
      headers: {
        ...headers,
        ...authHeaders
      },
      body
    });

    if (!response.ok) {
      throw new FbsServiceHttpError(
        response.status,
        response.statusText,
        serviceUrl
      );
    }

    // If the server returns 204 No Content, there is intentionally no body to parse
    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get("content-type") || "";
    const text = await response.text();

    // If the response is JSON, parse it (or return null when the body is empty)
    if (contentType.includes("application/json")) {
      return text ? (JSON.parse(text) as ResponseType) : null;
    }

    // Non-JSON and non-204 responses are treated as critical fetch failures
    throw new FetchFailedCriticalError(text, serviceUrl);
  } catch (error: unknown) {
    if (error instanceof FbsServiceHttpError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    throw new FetchFailedCriticalError(message, serviceUrl);
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
