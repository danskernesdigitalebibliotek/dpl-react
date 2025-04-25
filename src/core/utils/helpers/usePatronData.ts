import { useGetPersonTypePatronInformationV2 } from "../../fbs/fbs";
import BlockedTypes from "../types/BlockedTypes";
import { Patron } from "../types/entities";
import { isAnonymous } from "./user";
import type { QueryKey, UseQueryResult } from "react-query";
import type { ErrorType } from "../../fbs/mutator/fetcher";
import {
  AuthenticatedPatronV6,
  PatronV5,
  PersonPatronV2
} from "../../fbs/model";
import { first } from "lodash";

// Explicitly return the data structure of previous versions of the underlying
// generated hook from FBS.
export const usePatronData = (): UseQueryResult<
  Awaited<Promise<AuthenticatedPatronV6 | null>>,
  ErrorType<void>
> & { queryKey: QueryKey } => {
  const result = useGetPersonTypePatronInformationV2({
    enabled: !isAnonymous(),
    // Transform the response data structure to match previous versions
    select: (data: PersonPatronV2 | null): AuthenticatedPatronV6 | null => {
      return data
        ? {
            // As we use the FBS adapter where we are only able to retrieve
            // the patron matching the current authentication token it seems
            // safe to assume that authentication is valid if we can retrieve
            // data.
            authenticateStatus: "VALID",
            patron: convertPersonPatronV2ToPatronV5(data)
          }
        : null;
    }
  });

  return result;
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

const convertPersonPatronV2ToPatronV5 = (person: PersonPatronV2): PatronV5 => {
  return {
    // PersonPatronV2 supports multiple email addresses and phone numbers with
    // individual notifications. Reduce this to the first one to match the
    // data structure of PatronV5.
    emailAddress: first(person.emailAddresses)?.emailAddress,
    receiveEmail: first(person.emailAddresses)?.receiveNotification ?? false,
    phoneNumber: first(person.phoneNumbers)?.phoneNumber,
    receiveSms: first(person.phoneNumbers)?.receiveNotification ?? false,
    ...person
  };
};

export default {};
