import { getToken, TOKEN_LIBRARY_KEY } from "../../token";

const baseURL = "https://cover.dandigbib.org"; // use your own URL here or environment variable

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
  type FetchParams =
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined;

  const userToken = getToken(TOKEN_LIBRARY_KEY);

  if (!userToken) {
    throw new Error("Library token is missing!");
  }

  const additionalHeaders =
    data?.headers === "object" ? (data?.headers as unknown as object) : {};
  const headers = {
    Authorization: `Bearer ${userToken}`,
    ...additionalHeaders
  };
  const body = data ? JSON.stringify(data) : null;

  const response = await fetch(
    `${baseURL}${url}${new URLSearchParams(params as FetchParams)}`,
    {
      method,
      headers,
      body
    }
  );

  return (await response.json()) as ResponseType;
};

export default fetcher;

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData & { headers?: unknown };
