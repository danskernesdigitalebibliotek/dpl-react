import { useGetPatronInformationByPatronIdV4 } from "../../fbs/fbs";
import BlockedTypes from "../types/BlockedTypes";
import { AuthenticatedPatron, Patron } from "../types/entities";
import { isAnonymous } from "./user";
import { QueryKey, UseQueryResult } from "react-query";
import { ErrorType } from "../../fbs/mutator/fetcher";

export const usePatronData = (): UseQueryResult<
  Awaited<Promise<AuthenticatedPatron | null>>,
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
