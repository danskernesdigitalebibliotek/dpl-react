import FetchFailedCriticalError from "../../fetchers/FetchFailedCriticalError";
import { getServiceUrlWithParams } from "../../fetchers/helpers";
import { getToken, TOKEN_LIBRARY_KEY, TOKEN_USER_KEY } from "../../token";
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
  method: "get" | "post" | "put" | "delete" | "patch" | "head";
  headers?: object;
  params?: unknown;
  data?: BodyType<unknown>;
  signal?: AbortSignal;
}) => {
  const token = getToken(TOKEN_USER_KEY) ?? getToken(TOKEN_LIBRARY_KEY);
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

    try {
      return (await response.json()) as ResponseType;
    } catch (e) {
      if (!(e instanceof SyntaxError)) {
        throw e;
      }
    }
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
