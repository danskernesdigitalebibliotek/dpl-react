export type FetchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export type FetcherOptions = {
  bearerToken?: string;
  baseUrl: string;
};
export type RequestOptions = {
  bearerToken?: string;
  baseUrl?: string;
};
export type RequestArguments = {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  headers: Record<string, string>;
  params?: FetchParams;
  data?: BodyType<unknown>;
  responseType?: string;
  signal?: AbortSignal;
};
export type RequestCallback = (
  options: RequestArguments
) => RequestArguments & RequestOptions;

export type ErrorType<TErrorData> = TErrorData;

export type BodyType<TBodyData> = TBodyData;
