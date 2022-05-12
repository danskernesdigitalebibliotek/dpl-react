import { getToken, TOKEN_LIBRARY_KEY } from "../token";

export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables
) => {
  return async (): Promise<TData> => {
    // The whole concept of agency id, profile and and bearer token needs to be refined.
    // First version is with a library token.
    const libraryToken = getToken(TOKEN_LIBRARY_KEY);

    if (!libraryToken) {
      throw new Error("Library token is missing!");
    }

    const res = await fetch(
      "https://next-prototype-gateway.dbc.dk/775100/opac/graphql",
      {
        method: "POST",
        ...{
          headers: {
            Authorization: `Bearer ${libraryToken}`,
            "Content-Type": "application/json"
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
