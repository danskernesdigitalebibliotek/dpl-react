import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery
} from "react-query";
import { ErrorType, fetcher } from "./fetcher";
import { getToken, TOKEN_USER_KEY } from "../token";

type UserInfoData = {
  attributes: {
    cpr: number;
    userId: string;
    uniqueId: `${string}-${string}-${string}-${string}-${string}`;
    agencies: {
      agencyId: `${number}`;
      userId: string;
      userIdType: string;
    }[];
    municipality: `${number}`;
    municipalityAgencyId: `${number}`;
  };
};

const getUserInfo = (url: string, signal?: AbortSignal) => {
  return fetcher<UserInfoData>({
    url,
    method: "get",
    signal
  });
};

const getUserInfoQueryKey = (url: string) => {
  const userToken = getToken(TOKEN_USER_KEY);
  if (!userToken) {
    throw new Error("User token is missing");
  }

  return `${url}:${userToken}`;
};

const useUserInfo = <
  TData = Awaited<ReturnType<typeof getUserInfo>>,
  TError = ErrorType<void>
>(
  url: string,
  queryOptions?: UseQueryOptions<
    Awaited<ReturnType<typeof getUserInfo>>,
    TError,
    TData
  >
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryKey = queryOptions?.queryKey ?? getUserInfoQueryKey(url);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserInfo>>> = () =>
    getUserInfo(url);

  const query = useQuery<
    Awaited<ReturnType<typeof getUserInfo>>,
    TError,
    TData
  >(queryKey, queryFn, queryOptions);

  return {
    queryKey,
    ...query
  };
};

export default useUserInfo;
