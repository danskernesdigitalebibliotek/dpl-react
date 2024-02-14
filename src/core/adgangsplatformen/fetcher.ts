import FetchFailedCriticalError from "../fetchers/FetchFailedCriticalError";
import { getUserToken } from "../utils/helpers/user";
import AdgangsPlatformenServiceHttpError from "./AdgangsPlatformenServiceHttpError";

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
  const userToken = getUserToken();
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
      throw new AdgangsPlatformenServiceHttpError(
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
    if (error instanceof AdgangsPlatformenServiceHttpError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    throw new FetchFailedCriticalError(message, url);
  }

  return null;
};

export default {};

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData;
