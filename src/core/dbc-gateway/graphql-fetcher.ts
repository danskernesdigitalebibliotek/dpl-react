import { QueryFunctionContext } from "react-query";
import FetchFailedCriticalError from "../fetchers/FetchFailedCriticalError";
import { getToken, TOKEN_LIBRARY_KEY, TOKEN_USER_KEY } from "../token";
import DbcGateWayHttpError from "./DbcGateWayHttpError";
import { getQueryUrlFromContext } from "./helper";

export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables
) => {
  return (context?: QueryFunctionContext): Promise<TData> => {
    // Resolve the url based on the query name if present.
    const url = getQueryUrlFromContext(context);

    // The whole concept of agency id, profile and and bearer token needs to be refined.
    // First version is with a library token.
    const token = getToken(TOKEN_USER_KEY) || getToken(TOKEN_LIBRARY_KEY);

    const headers = {
      "Content-Type": "application/json"
    };
    const authHeaders = token
      ? ({ Authorization: `Bearer ${token}` } as object)
      : {};

    return fetch(url, {
      method: "POST",
      ...{
        headers: {
          ...headers,
          ...authHeaders
        }
      },
      body: JSON.stringify({ query, variables })
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new DbcGateWayHttpError(response.status, response.statusText);
        }

        const json = await response.json();

        // See if we have any errors in the response.
        if (json.errors) {
          const { message } = json.errors[0];

          throw new Error(message);
        }

        return json.data;
      })
      .catch((error: unknown) => {
        if (error instanceof DbcGateWayHttpError) {
          throw error;
        }

        const message =
          error instanceof Error ? error.message : "Unknown error";
        throw new FetchFailedCriticalError(message, query);
      });
  };
};

export default {};
