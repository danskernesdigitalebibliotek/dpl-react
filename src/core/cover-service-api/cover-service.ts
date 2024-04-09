/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * DDF Cover Service
 * This service provides covers for library materials indexed by isbn, issn, faust, pid.
The service is provided by [Det Digitale Folkebibliotek](https://detdigitalefolkebibliotek.dk/section/i-brug-paa-biblioteket/cover-service)
### Authentication notes
Authentication is done via OAuth2 against auth.dbc.dk. To obtain a valid token follow the instructions here: [Open Platform](https://openplatform.dbc.dk/v3/). To use the "Authorize" option in this tool use your 'client_id' and 'client_secret' and fill in '@agency' (e.g. '@123456') for both username and password.
 * OpenAPI spec version: 2.0
 */
import { useQuery } from "react-query";
import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult
} from "react-query";
import type { Cover, GetCoverCollectionParams } from "./model";
import { fetcher } from "./mutator/fetcher";
import type { ErrorType } from "./mutator/fetcher";

/**
 * Get covers by identifier in specific image format(s), specific image size(s) and with or without generic covers.
 * @summary Search multiple covers
 */
export const getCoverCollection = (
  params: GetCoverCollectionParams,
  signal?: AbortSignal
) => {
  return fetcher<Cover[]>({
    url: `/api/v2/covers`,
    method: "GET",
    params,
    signal
  });
};

export const getGetCoverCollectionQueryKey = (
  params: GetCoverCollectionParams
) => {
  return [`/api/v2/covers`, ...(params ? [params] : [])] as const;
};

export const getGetCoverCollectionQueryOptions = <
  TData = Awaited<ReturnType<typeof getCoverCollection>>,
  TError = ErrorType<void>
>(
  params: GetCoverCollectionParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getCoverCollection>>,
      TError,
      TData
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetCoverCollectionQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getCoverCollection>>
  > = ({ signal }) => getCoverCollection(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getCoverCollection>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetCoverCollectionQueryResult = NonNullable<
  Awaited<ReturnType<typeof getCoverCollection>>
>;
export type GetCoverCollectionQueryError = ErrorType<void>;

/**
 * @summary Search multiple covers
 */
export const useGetCoverCollection = <
  TData = Awaited<ReturnType<typeof getCoverCollection>>,
  TError = ErrorType<void>
>(
  params: GetCoverCollectionParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getCoverCollection>>,
      TError,
      TData
    >;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetCoverCollectionQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
