import FetchFailedCriticalError from "../../../fetchers/FetchFailedCriticalError";
import { getToken, TOKEN_USER_KEY } from "../../../token";
import OpenIdServiceHttpError from "./OpenIdServiceHttpError";

export const fetcher = async <ResponseType>({
  url,
  method,
  headers,
  data
}: {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch" | "head";
  headers?: object;
  data?: BodyType<unknown>;
  signal?: AbortSignal;
}) => {
  const userToken = getToken(TOKEN_USER_KEY);
  if (!userToken) {
    throw new Error("User token is missing");
  }

  const authHeaders = userToken
    ? ({ Authorization: `Bearer ${userToken}` } as object)
    : {};

  const body = data ? JSON.stringify(data) : null;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...headers,
        ...authHeaders
      },
      body
    });

    if (!response.ok) {
      throw new OpenIdServiceHttpError(
        response.status,
        response.statusText,
        url
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
    if (error instanceof OpenIdServiceHttpError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    throw new FetchFailedCriticalError(message, url);
  }

  // Do nothing. Some of our responses are intentionally empty and thus
  // cannot be converted to JSON. Fetch API and TypeScript has no clean
  // way for us to identify empty responses, so instead we swallow
  // syntax errors during decoding.
  return null;
};

export default {};

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData;
