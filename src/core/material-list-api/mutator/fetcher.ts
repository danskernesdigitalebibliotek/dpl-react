import FetchFailedError from "../../fetchers/FetchFailedError";
import { getServiceUrlWithParams } from "../../fetchers/helpers";
import { getToken, TOKEN_USER_KEY } from "../../token";
import {
  getServiceBaseUrl,
  serviceUrlKeys
} from "../../utils/reduxMiddleware/extractServiceBaseUrls";
import MaterialListServiceHttpError from "./MaterialListServiceHttpError";

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

  const userToken = getToken(TOKEN_USER_KEY);
  const authHeaders = userToken
    ? ({ Authorization: `Bearer ${userToken}` } as object)
    : {};

  const headers = {
    ...authHeaders,
    ...additionalHeaders
  };
  const body = data ? JSON.stringify(data) : null;
  const serviceUrl = getServiceUrlWithParams({
    baseUrl: getServiceBaseUrl(serviceUrlKeys.materialList),
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
      throw new MaterialListServiceHttpError(
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
  } catch (error) {
    if (error instanceof MaterialListServiceHttpError) {
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
