import FetchFailedCriticalError from "../../fetchers/FetchFailedCriticalError";
import { getServiceUrlWithParams } from "../../fetchers/helpers";
import { getToken, TOKEN_USER_KEY, TOKEN_LIBRARY_KEY } from "../../token";
import {
  getServiceBaseUrl,
  serviceUrlKeys
} from "../../utils/reduxMiddleware/extractServiceBaseUrls";
import PublizonServiceError from "./PublizonServiceError";

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
  const token = getToken(TOKEN_USER_KEY) ?? getToken(TOKEN_LIBRARY_KEY);
  const authHeaders = token
    ? ({ Authorization: `Bearer ${token}` } as object)
    : {};

  const body = data ? JSON.stringify(data) : null;
  const serviceUrl = getServiceUrlWithParams({
    baseUrl: getServiceBaseUrl(serviceUrlKeys.publizon),
    url,
    params
  });

  try {
    const response = await fetch(serviceUrl, {
      method,
      headers: {
        ...headers,
        ...authHeaders
      },
      body
    });

    // Json decode the response.
    try {
      const responseBody = await response.json();
      if (!response.ok) {
        throw new PublizonServiceError(
          response.status,
          response.statusText,
          responseBody,
          serviceUrl
        );
      }
      return (responseBody as ResponseType) ?? null;
      // If the response is not JSON, we catch the error and throw a syntax error.
    } catch (e) {
      if (!(e instanceof SyntaxError)) {
        throw e;
      }
    }
    // Errors at this point are critical and should be handled by the error boundary.
  } catch (error: unknown) {
    if (error instanceof PublizonServiceError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    throw new FetchFailedCriticalError(message, serviceUrl);
  }
  // We did not succeed in fetching the data.
  // and we return null to indicate that.
  return null;
};

export default fetcher;

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData;
