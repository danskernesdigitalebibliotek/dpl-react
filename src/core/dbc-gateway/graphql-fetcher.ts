import { getToken, TOKEN_LIBRARY_KEY, TOKEN_USER_KEY } from "../token";
import {
  getServiceBaseUrl,
  serviceUrlKeys
} from "../utils/reduxMiddleware/extractServiceBaseUrls";

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

    const res = await fetch(getServiceBaseUrl(serviceUrlKeys.fbi), {
      method: "POST",
      ...{
        headers: {
          ...headers,
          ...authHeaders
        }
      },
      body: JSON.stringify({ query, variables })
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
};

export default {};
