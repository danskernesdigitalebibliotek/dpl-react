import { useGetPatronInformationByPatronIdV4 } from "../../fbs/fbs";
import BlockedTypes from "../types/BlockedTypes";
import { Patron } from "../types/entities";
import { isAnonymous } from "./user";
import type { QueryKey, UseQueryResult } from "react-query";
import type { ErrorType } from "../../fbs/mutator/fetcher";
import { AuthenticatedPatronV6 } from "../../fbs/model";

export const usePatronData = (): UseQueryResult<
  Awaited<Promise<AuthenticatedPatronV6 | null>>,
  ErrorType<void>
> & { queryKey: QueryKey } => {
  return useGetPatronInformationByPatronIdV4({
    enabled: !isAnonymous()
  });
};

export const getBlockedStatus = (patron?: Patron) => {
  // TODO: Investigate if we need to consider multiple
  // block statuses and not only the first.
  if (patron?.blockStatus && patron?.blockStatus?.length > 0) {
    return patron.blockStatus[0].blockedReason as BlockedTypes;
  }
  // We cannot resolve the block status so we return unknown
  return BlockedTypes.unknown;
};

export default {};
