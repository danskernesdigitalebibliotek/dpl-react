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
  const response = await fetch(
    `${baseURL}${url}${new URLSearchParams(params as FetchParams)}`,
    {
      method,
      headers: {
        ...data?.headers,
        Authorization: `Bearer fb80d9b5a5e776bb4cf6106fbd4bcf93ebede495`
      },
      ...(data ? { body: JSON.stringify(data) } : {})
    }
  );

  return (await response.json()) as ResponseType;
};

export default fetcher;

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData & { headers?: any };
