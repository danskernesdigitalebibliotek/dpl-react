import { buildParams, createAuthHeader } from "../helpers";
import { FetcherOptions, RequestArguments, RequestCallback } from "../types";

const fetcherFactory = (
  fetcherOptions: FetcherOptions,
  requestCallback: RequestCallback
) => {
  return async <TResponse>(
    requestArguments: RequestArguments
  ): Promise<TResponse> => {
    const { baseUrl, headers, url, params, method, data, bearerToken } =
      requestCallback({ ...fetcherOptions, ...requestArguments });

    const urlParams = params ? buildParams(params).toString() : "";
    const body = data ? JSON.stringify(data) : null;
    const response = await fetch(`${baseUrl}${url}${urlParams}`, {
      method,
      headers: {
        ...headers,
        ...createAuthHeader(bearerToken)
      },
      body
    });

    return response.json();
  };
};

export default fetcherFactory;
