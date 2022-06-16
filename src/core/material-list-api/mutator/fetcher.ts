import { getToken, TOKEN_USER_KEY } from "../../token";
const baseURL = "https://prod.materiallist.dandigbib.org"; // use your own URL here or environment variable

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

  const userToken = getToken(TOKEN_USER_KEY);

  if (!userToken) {
    throw new Error("User token is missing!");
  }

  const response = await fetch(
    `${baseURL}${url}${new URLSearchParams(params as FetchParams)}`,
    {
      method,
      headers: {
        ...data?.headers,
        Authorization: `Bearer ${userToken}`
      },

      ...(data ? { body: JSON.stringify(data) } : {})
    }
  );

  try {
    return (await response.json()) as ResponseType;
  } catch (e) {
    if (!(e instanceof SyntaxError)) {
      throw e;
    }

    // Do nothing. Some of our responses are intentionally empty and thus
    // cannot be converted to JSON. Fetch API and TypeScript has no clean
    // way for us to identify empty responses so instead we swallow
    // syntax errors during decoding.
  }
};

export default fetcher;

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData & { headers?: any };
