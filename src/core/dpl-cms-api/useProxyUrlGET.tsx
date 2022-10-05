import {
  useQuery,
  UseQueryOptions,
  QueryFunction,
  UseQueryResult,
  QueryKey
} from "react-query";
import { getProxyUrlGETQueryKey, proxyUrlGET } from "./dpl";
import type { ProxyUrlGETParams } from "./model";
import { ErrorType } from "./mutator/fetcher";

const useProxyUrlGET = <
  TData = Awaited<ReturnType<typeof proxyUrlGET>>,
  TError = ErrorType<void>
>(
  params?: ProxyUrlGETParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof proxyUrlGET>>,
      TError,
      TData
    >;
    enabled?: boolean;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions, enabled } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getProxyUrlGETQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof proxyUrlGET>>> = ({
    signal
  }) => proxyUrlGET(params, signal);

  const query = useQuery<
    Awaited<ReturnType<typeof proxyUrlGET>>,
    TError,
    TData
  >(queryKey, queryFn, {
    ...queryOptions,
    ...(enabled !== undefined ? { enabled } : {})
  });

  return {
    queryKey,
    ...query
  };
};

export default useProxyUrlGET;
