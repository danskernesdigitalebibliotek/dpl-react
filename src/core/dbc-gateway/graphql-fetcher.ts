import { getToken, TOKEN_LIBRARY_KEY, TOKEN_USER_KEY } from "../token";
import getFetcherUrl, { configTypes } from "../utils/helpers/fetcher";

const defaultBaseUrl = "https://fbi-api.dbc.dk/opac/graphql";

export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables
) => {
  return async (): Promise<TData> => {
    // The whole concept of agency id, profile and and bearer token needs to be refined.
    // First version is with a library token.
    const token = getToken(TOKEN_USER_KEY) || getToken(TOKEN_LIBRARY_KEY);

    const headers = {
      "Content-Type": "application/json"
    };
    const authHeaders = token
      ? ({ Authorization: `Bearer ${token}` } as object)
      : {};

    const baseUrlFromConfig = getFetcherUrl(configTypes.fbi);
    const baseURL = baseUrlFromConfig || defaultBaseUrl;

    const res = await fetch(
      // For now the endpoint is hardcoded. (although it is unclear which agency id to use)
      // When we get wiser of when the library id and profile is changing
      // we will update it with a dynamic version:
      baseURL,
      {
        method: "POST",
        ...{
          headers: {
            ...headers,
            ...authHeaders
          }
        },
        body: JSON.stringify({ query, variables })
      }
    );

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
};

export default {};
